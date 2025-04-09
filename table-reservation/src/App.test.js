import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import BookingForm from "./components/BookingForm";
import BookingMain from "./components/BookingMain";
import { initializeTimes, updateTimes, loadReservedTimes } from './components/BookingMain';
import "@testing-library/jest-dom";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  global.fetchAPI = jest.fn(() => ["17:00", "17:30", "18:00"]);
  global.submitAPI = jest.fn(() => true);
});
afterEach(() => {
  delete global.fetchAPI;
  delete global.submitAPI;
});

const mockErrors = {
  firstName: "",
  lastName: "",
  userEmail: "",
  selectedTimeRaw: "",
};

const mockDate = new Date().toLocaleDateString("en-US", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

test('rendering the BookingForm heading', () => {
  const mockDispatch = jest.fn();
  const mockAvailableTimes = [{ rawTime: "17:30", displayTime: "5:30 PM", available: true }];
  const mockFormData = { selectedDate: "", selectedTimeRaw: "", selectedTimeDisplay: "" };
  render(
    <BookingForm
      availableTimes={mockAvailableTimes}
      dispatch={mockDispatch}
      formData={mockFormData}
      onFormChange={() => {}}
      resetFormData={() => {}}
      errors={mockErrors}
    />
  );
  const headingElement = screen.getByText("Contact Information");
  expect(headingElement).toBeInTheDocument();
});

test('initializeTimes should return the available API times', () => {
  const result = initializeTimes();
  expect(global.fetchAPI).toHaveBeenCalledTimes(1);
  expect(global.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
  expect(result).toBeInstanceOf(Array);
  expect(result.length).toBeGreaterThan(0);
});

test('updateTimes should update times and exclude reserved ones', () => {
  const initialState = [];
  const action = {
    type: "UPDATE_TIMES",
    payload: {
      times: ["17:30", "18:00", "18:30"],
      date: "2025-03-25",
      reservedTimes: { "2025-03-25": ["18:00"] }
    }
  };
  const result = updateTimes(initialState, action);
  expect(result).toEqual([
    { rawTime: "17:30", displayTime: "5:30 PM", available: true },
    { rawTime: "18:00", displayTime: "6:00 PM", available: false },
    { rawTime: "18:30", displayTime: "6:30 PM", available: true }
  ]);
});

test("user can fill out and submit the BookingForm", () => {
  const mockDispatch = jest.fn();
  let mockFormData = {
    selectedDate: mockDate,
    groupSize: "2 People",
    selectedSeating: "Inside Seating",
    selectedOccasion: "",
    selectedTimeRaw: "17:30",
    selectedTimeDisplay: "5:30 PM",
    firstName: "",
    lastName: "",
    userEmail: "",
    specialRequests: "",
  };
  const availableTimes = [{ rawTime: "17:30", displayTime: "5:30 PM", available: true }];
  const mockSetReservedTimes = jest.fn();
  const mockResetFormData = jest.fn();
  const mockOnFormChange = jest.fn((field, value) => {
    mockFormData[field] = value;
  });
  render(
    <BookingForm
      availableTimes={availableTimes}
      dispatch={mockDispatch}
      formData={mockFormData}
      onFormChange={mockOnFormChange}
      resetFormData={mockResetFormData}
      setReservedTimes={mockSetReservedTimes}
      errors={mockErrors}
      isFormValid={true}
    />
  );
  fireEvent.change(screen.getByLabelText("First Name*"), { target: { value: "Jason" } });
  fireEvent.change(screen.getByLabelText("Last Name*"), { target: { value: "Bourne" } });
  fireEvent.change(screen.getByLabelText("Email*"), { target: { value: "jb@mail.com" } });
  fireEvent.change(screen.getByLabelText("Special Requests (optional)"), { target: { value: "A table with a view!" } });
  fireEvent.click(screen.getByText("Complete Reservation"));
  expect(global.submitAPI).toHaveBeenCalledWith(
    expect.objectContaining({
      selectedDate: mockDate,
      groupSize: "2 People",
      selectedSeating: "Inside Seating",
      selectedOccasion: "",
      selectedTimeRaw: "17:30",
      selectedTimeDisplay: "5:30 PM",
      firstName: "Jason",
      lastName: "Bourne",
      userEmail: "jb@mail.com",
      specialRequests: "A table with a view!",
    })
  );
  expect(mockNavigate).toHaveBeenCalledWith(
    "/confirmed-booking",
    expect.objectContaining({
      state: expect.objectContaining({
        formData: expect.objectContaining({
          selectedDate: mockDate,
          groupSize: "2 People",
          selectedSeating: "Inside Seating",
          selectedOccasion: "",
          selectedTimeRaw: "17:30",
          selectedTimeDisplay: "5:30 PM",
          firstName: "Jason",
          lastName: "Bourne",
          userEmail: "jb@mail.com",
          specialRequests: "A table with a view!",
        }),
      }),
    })
  );
});

test("should return an empty object when localStorage is empty", () => {
  localStorage.clear();
  expect(loadReservedTimes()).toEqual({});
});

test("should return parsed data when localStorage contains reserved times", () => {
  const mockData = { "3/10/2025": ["17:30", "18:00"] };
  localStorage.setItem("reservedTimes", JSON.stringify(mockData));
  const result = loadReservedTimes();
  expect(result).toEqual(mockData);
});

test("should update localStorage when a reservation is submitted", () => {
  localStorage.clear();
  const mockDispatch = jest.fn();
  let mockFormData = {
    selectedDate: mockDate,
    groupSize: "2 People",
    selectedSeating: "Inside Seating",
    selectedOccasion: "",
    selectedTimeRaw: "17:30",
    selectedTimeDisplay: "5:30 PM",
    firstName: "Jason",
    lastName: "Bourne",
    userEmail: "jb@mail.com",
    specialRequests: "A table with a view!",
  };
  const availableTimes = [{ rawTime: "17:30", displayTime: "5:30 PM", available: true }];
  const mockResetFormData = jest.fn();
  const mockOnFormChange = jest.fn((field, value) => {
    mockFormData[field] = value;
  });
  const mockSetReservedTimes = jest.fn((updateFn) => {
    const prevTimes = JSON.parse(localStorage.getItem("reservedTimes")) || {};
    const newTimes = updateFn(prevTimes);
    localStorage.setItem("reservedTimes", JSON.stringify(newTimes));
  });
  render(
    <BookingForm
      availableTimes={availableTimes}
      dispatch={mockDispatch}
      formData={mockFormData}
      onFormChange={mockOnFormChange}
      resetFormData={mockResetFormData}
      setReservedTimes={mockSetReservedTimes}
      errors={mockErrors}
      isFormValid={true}
    />
  );
  fireEvent.click(screen.getByText("Complete Reservation"));
  expect(global.submitAPI).toHaveBeenCalledWith(mockFormData);
  const storedData = JSON.parse(localStorage.getItem("reservedTimes"));
  expect(storedData).toEqual({
    [mockDate]: ["17:30"],
  });
  expect(mockNavigate).toHaveBeenCalledWith(
    "/confirmed-booking",
    expect.objectContaining({
      state: expect.objectContaining({
        formData: expect.objectContaining({
          selectedDate: mockDate,
          groupSize: "2 People",
          selectedSeating: "Inside Seating",
          selectedOccasion: "",
          selectedTimeRaw: "17:30",
          selectedTimeDisplay: "5:30 PM",
          firstName: "Jason",
          lastName: "Bourne",
          userEmail: "jb@mail.com",
          specialRequests: "A table with a view!",
        }),
      }),
    })
  );
});

test("validates that clicked but empty required fields show errors and prevent form submission", () => {
  render(<BookingMain />);
  const firstNameInput = screen.getByLabelText("First Name*");
  const lastNameInput = screen.getByLabelText("Last Name*");
  const emailInput = screen.getByLabelText("Email*");
  const submitBtn = screen.getByText("Complete Reservation");
  fireEvent.blur(firstNameInput);
  waitFor(() => expect(screen.getByText("First name is required")).toBeInTheDocument());
  fireEvent.blur(lastNameInput);
  waitFor(() => expect(screen.getByText("Last name is required")).toBeInTheDocument());
  fireEvent.blur(emailInput);
  waitFor(() => expect(screen.getByText("Email is required")).toBeInTheDocument());
  fireEvent.click(submitBtn);
  waitFor(() => expect(global.submitAPI).not.toHaveBeenCalled());
  waitFor(() => expect(mockNavigate).not.toHaveBeenCalledWith("/confirmed-booking"));
});

test("validates time option not selected prevents form submission", () => {
  render(<BookingMain />);
  const firstNameInput = screen.getByLabelText("First Name*");
  const lastNameInput = screen.getByLabelText("Last Name*");
  const emailInput = screen.getByLabelText("Email*");
  const submitBtn = screen.getByText("Complete Reservation");
  fireEvent.change(firstNameInput, { target: { value: "Jason" } });
  waitFor(() => expect(firstNameInput.value).toBe("Jason"));
  fireEvent.change(lastNameInput, { target: { value: "Bourne" } });
  waitFor(() => expect(lastNameInput.value).toBe("Bourne"));
  fireEvent.change(emailInput, { target: { value: "jb@mail.com" } });
  waitFor(() => expect(emailInput.value).toBe("jb@mail.com"));
  fireEvent.click(submitBtn);
  waitFor(() => expect(global.submitAPI).not.toHaveBeenCalled());
  waitFor(() => expect(mockNavigate).not.toHaveBeenCalledWith("/confirmed-booking"));
});

test("validates all required options filed or selected allows form submission", () => {
  global.fetchAPI = jest.fn(() => ["17:00"]);
  const availableTimes = [{ rawTime: "17:00", displayTime: "5:00 PM", available: true }];
  render(
    <BookingMain
      availableTimes={availableTimes}
    />
  );
  const firstNameInput = screen.getByLabelText("First Name*");
  const lastNameInput = screen.getByLabelText("Last Name*");
  const emailInput = screen.getByLabelText("Email*");
  const timeBtn = screen.getByRole("button", { name: "5:00 PM" });
  const submitBtn = screen.getByText("Complete Reservation");
  fireEvent.change(firstNameInput, { target: { value: "Jason" } });
  waitFor(() => expect(firstNameInput.value).toBe("Jason"));
  fireEvent.change(lastNameInput, { target: { value: "Bourne" } });
  waitFor(() => expect(lastNameInput.value).toBe("Bourne"));
  fireEvent.change(emailInput, { target: { value: "jb@mail.com" } });
  waitFor(() => expect(emailInput.value).toBe("jb@mail.com"));
  fireEvent.click(timeBtn);
  fireEvent.click(submitBtn);
  waitFor(() => expect(global.submitAPI).toHaveBeenCalledWith(
    expect.objectContaining({
      selectedTimeRaw: "17:00",
    })
  ));
  waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/confirmed-booking"));
});

