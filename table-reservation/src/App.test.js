import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from "./components/BookingForm";
import { initializeTimes, updateTimes } from './components/BookingMain';
import "@testing-library/jest-dom";

test('Renders the BookingForm heading', () => {
  const mockDispatch = jest.fn();
  const mockAvailableTimes = [
    { time: "5:30 PM", available: true },
  ];
  render(
    <BookingForm availableTimes={mockAvailableTimes} dispatch={mockDispatch} />
  );
  const headingElement = screen.getByText("Contact Information");
  expect(headingElement).toBeInTheDocument();
});

test('initializeTimes should return the correct initial available times', () => {
  const expectedTimes = [
    { time: "5:30 PM", available: true },
    { time: "6:00 PM", available: true},
    { time: "6:30 PM", available: true },
    { time: "7:00 PM", available: true },
    { time: "7:30 PM", available: true },
    { time: "8:00 PM", available: true },
    { time: "8:30 PM", available: true },
    { time: "9:00 PM", available: true },
    { time: "9:30 PM", available: true },
    { time: "10:00 PM", available: true },
    { time: "10:30 PM", available: true },
    { time: "11:00 PM", available: true },
    { time: "11:30 PM", available: true },
  ];

  const result = initializeTimes();
  expect(result).toEqual(expectedTimes);
});

test('updateTimes should return initialized times when action type is UPDATE_TIMES', () => {
  const initialState = [];
  const action = { type: "UPDATE_TIMES", payload: "2025-03-25" };

  const expectedTimes = [
    { time: "5:30 PM", available: true },
    { time: "6:00 PM", available: true},
    { time: "6:30 PM", available: true },
    { time: "7:00 PM", available: true },
    { time: "7:30 PM", available: true },
    { time: "8:00 PM", available: true },
    { time: "8:30 PM", available: true },
    { time: "9:00 PM", available: true },
    { time: "9:30 PM", available: true },
    { time: "10:00 PM", available: true },
    { time: "10:30 PM", available: true },
    { time: "11:00 PM", available: true },
    { time: "11:30 PM", available: true },
  ];

  const result = updateTimes(initialState, action);
  expect(result).toEqual(expectedTimes);
});

test("User can fill out and submit the BookingForm", () => {
  // Mock dispatch function
  const mockDispatch = jest.fn();

  // Mock available times
  const availableTimes = [
    { time: "5:30 PM", available: true },
    { time: "6:00 PM", available: true },
  ];

  const mockDate = new Date().toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  // Render the BookingForm component
  render(<BookingForm availableTimes={availableTimes} dispatch={mockDispatch} />);

  // Fill out the form fields
  fireEvent.change(screen.getByLabelText("First Name*"), {
    target: { value: "Jason" },
  });
  fireEvent.change(screen.getByLabelText("Last Name*"), {
    target: { value: "Bourne" },
  });
  fireEvent.change(screen.getByLabelText("Email*"), {
    target: { value: "jb@mail.com" },
  });
  fireEvent.change(screen.getByLabelText("Special Requests (optional)"), {
    target: { value: "A table with a view!" },
  });

  // Submit the form
  fireEvent.click(screen.getByText("Complete Reservation"));
  
  // Check if the dispatch function was called with the correct payload
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SUBMIT_FORM",
    payload: {
      selectedDate: mockDate,
      groupSize: "2 People",
      selectedSeating: "Inside Seating",
      selectedOccasion: "",
      selectedTime: "",
      firstName: "Jason",
      lastName: "Bourne",
      userEmail: "jb@mail.com",
      specialRequests: "A table with a view!",
    },
  });

  // Check if the form is reset (inputs should be empty)
  expect(screen.getByLabelText("First Name*")).toHaveValue("");
  expect(screen.getByLabelText("Email*")).toHaveValue("");
  expect(screen.getByLabelText("Special Requests (optional)")).toHaveValue("");
});
