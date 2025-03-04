import React, { useReducer, useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";

const initialAvailableTimes = [];

const formatTime = (time) => {
  let [hours, minutes] = time.split(":");
  let parsedHours = parseInt(hours, 10);
  let period = parsedHours >= 12 ? "PM" : "AM";
  let formattedHours = parsedHours % 12 || 12;
  return `${formattedHours}:${minutes} ${period}`;
};

const loadReservedTimes = () => {
  const storedTimes = localStorage.getItem("reservedTimes");
  return storedTimes ? JSON.parse(storedTimes) : {};
};

export const initializeTimes = () => {
  return initialAvailableTimes;
};

export const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES" && Array.isArray(action.payload.times)) {
    const { date, reservedTimes } = action.payload;

    return action.payload.times.map((time) => ({
      rawTime: time,
      displayTime: formatTime(time),
      available: !(reservedTimes[date]?.includes(time)), // Mark unavailable if reserved
    }));
  }
  return state;
};

const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [reservedTimes, setReservedTimes] = useState(loadReservedTimes);

  const [formData, setFormData] = useState({
    selectedDate: "",
    groupSize: "",
    selectedSeating: "",
    selectedOccasion: "",
    selectedTimeRaw: "",
    selectedTimeDisplay: "",
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
      selectedTimeRaw: "",
      selectedTimeDisplay: "",
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
    const today = new Date().toLocaleDateString();
    const apiTimes = window.fetchAPI(new Date());
    dispatch({ type: "UPDATE_TIMES", payload: { times: apiTimes, date: today, reservedTimes } });
  }, [reservedTimes]);

  useEffect(() => {
    if (formData.selectedDate) {
      const apiTimes = window.fetchAPI(new Date(formData.selectedDate));
      dispatch({
        type: "UPDATE_TIMES",
        payload: { times: apiTimes, date: formData.selectedDate, reservedTimes },
      });
    }
  }, [formData.selectedDate, reservedTimes]);

  useEffect(() => {
    localStorage.setItem("reservedTimes", JSON.stringify(reservedTimes));
  }, [reservedTimes]);

  return (
    <>
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        formData={formData}
        onFormChange={handleFormChange}
        resetFormData={resetFormData}
        reservedTimes={reservedTimes}
        setReservedTimes={setReservedTimes}
      />
    </>
  );
};

export default Main;
