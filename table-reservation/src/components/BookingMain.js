import React, { useReducer, useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";

const initialAvailableTimes = [];

const timeFormatting = (time) => {
  let [hours, minutes] = time.toString().split(":");
  const parsedHours = parseInt(hours, 10);
  const parsedMinutes = parseInt(minutes, 10);
  const period = parsedHours <= 12 ? "PM" : "AM";
  const formattedHours = parsedHours % 12 || 12;
  return `${formattedHours}:${parsedMinutes.toString().padStart(2, "0")} ${period}`;
};

export const initializeTimes = () => {
  return initialAvailableTimes;
};

export const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES" && Array.isArray(action.payload)) {
    return action.payload.map(time => ({
        time: timeFormatting(time),
        available: true
    }));
  }
  return state;
};

const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  
  const [formData, setFormData] = useState({
    selectedDate: "",
    groupSize: "",
    selectedSeating: "",
    selectedOccasion: "",
    selectedTime: "",
    firstName: "",
    lastName: "",
    userEmail: "",
    specialRequests: "",
  });

  const resetFormData = () => {
    setFormData({
      selectedDate: new Date().toLocaleDateString(),
      groupSize: "",
      selectedSeating: "",
      selectedOccasion: "",
      selectedTime: "",
      firstName: "",
      lastName: "",
      userEmail: "",
      specialRequests: "",
    });
  };
  
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  useEffect(() => {
    const today = new Date();
    const apiTimes = window.fetchAPI(today);
    const formattedTimes = apiTimes.map(time => timeFormatting(time));
    dispatch({ type: "UPDATE_TIMES", payload: formattedTimes });
  }, []);
  useEffect(() => {
    if (formData.selectedDate) {
        const apiTimes = window.fetchAPI(new Date(formData.selectedDate));
        const formattedTimes = apiTimes.map(time => timeFormatting(time));
        dispatch({ type: "UPDATE_TIMES", payload: formattedTimes });
    }
}, [formData.selectedDate]);

  return (
    <>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        formData={formData}
        onFormChange={handleFormChange}
        resetFormData={resetFormData}
      />
    </>
  );
};

export default Main;
