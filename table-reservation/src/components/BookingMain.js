import React, { useReducer, useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";

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
  const apiTimes = window.fetchAPI(new Date());
  return Array.isArray(apiTimes) ? apiTimes : [];
};

export const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES" && Array.isArray(action.payload.times)) {
    const { date, reservedTimes } = action.payload;

    return action.payload.times.map((time) => ({
      rawTime: time,
      displayTime: formatTime(time),
      available: !(reservedTimes[date]?.includes(time)),
    }));
  }
  return state;
};

const Main = () => {
  const [availableTimes, dispatch] = useReducer(updateTimes, []);
  const [reservedTimes, setReservedTimes] = useState(loadReservedTimes);
  const [timesLoading, setTimesLoading] = useState(true);
  const [timesErrorMessage, setTimesErrorMessage] = useState(false);

  const apiCheck = () => {
    console.warn("API is unavailable or blocked. Loading default empty times.");
    setTimesErrorMessage(true);
    setTimesLoading(false);
    return [];
  };

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
    const fetchInitialTimes = async () => {
      if (!window.fetchAPI) {
        apiCheck();
        return
      }
      const apiTimes = await initializeTimes();
      const today = new Date().toLocaleDateString()
      dispatch({
        type: "UPDATE_TIMES",
        payload: { times: apiTimes, date: today, reservedTimes },
      });
      setTimesLoading(false);
    };
    fetchInitialTimes();
  }, [reservedTimes]);

  useEffect(() => {
    if (formData.selectedDate) {
      const fetchNewTimes = async () => {
        if (!window.fetchAPI) {
          apiCheck();
          return
        }
        const apiTimes = window.fetchAPI(new Date(formData.selectedDate));
        dispatch({
          type: "UPDATE_TIMES",
          payload: { times: apiTimes, date: formData.selectedDate, reservedTimes },
        });
        setTimesLoading(false);
      };
      fetchNewTimes();
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
        timesErrorMessage={timesErrorMessage}
        timesLoading={timesLoading}
      />
    </>
  );
};

export default Main;
