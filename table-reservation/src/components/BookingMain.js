import React, { useState } from "react";
import BookingForm from "../components/BookingForm";

const Main = () => {
  const [availableTimes, setAvailableTimes] = useState([
    { time: "5:30 PM", available: true },
    { time: "6:00 PM", available: false},
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
  ]);

  return (
    <>
      <BookingForm
        availableTimes={availableTimes}
        setAvailableTimes={setAvailableTimes}
      />
    </>
  );
};

export default Main;
