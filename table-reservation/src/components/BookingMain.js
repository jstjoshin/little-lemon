import React, { useReducer } from "react";
import BookingForm from "../components/BookingForm";

const initialAvailableTimes = [
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

export const initializeTimes = () => {
  return initialAvailableTimes;
  /*
  const dynamicTimes = initialAvailableTimes;

    return dynamicTimes.map((timeSlot) => ({
        ...timeSlot,
        available: Math.random() > 0.5 // Example: Randomly set availability
    }));
  */
};
export const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES") {
      return initializeTimes(action.payload);
  }
  return state;
};

const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
      />
    </>
  );
};

export default Main;
