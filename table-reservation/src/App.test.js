import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from "./components/BookingForm";
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

test('rendering the BookingForm heading', () => {
  const mockDispatch = jest.fn();
  const mockAvailableTimes = [{ rawTime: "17:30", displayTime: "5:30 PM", available: true }];
  const mockFormData = { selectedDate: "", selectedTimeRaw: "", selectedTimeDisplay: "" };
  render(<BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} formData={mockFormData} onFormChange={() => {}}
  resetFormData={() => {}} />);
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
  const mockDate = new Date().toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
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
  expect(mockNavigate).toHaveBeenCalledWith("/confirmed-booking");
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
  const mockDate = new Date().toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
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
    />
  );
  fireEvent.click(screen.getByText("Complete Reservation"));
  expect(global.submitAPI).toHaveBeenCalledWith(mockFormData);
  const storedData = JSON.parse(localStorage.getItem("reservedTimes"));
  expect(storedData).toEqual({
    [mockDate]: ["17:30"],
  });
  expect(mockNavigate).toHaveBeenCalledWith("/confirmed-booking");
});


