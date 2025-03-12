import React, { useReducer, useEffect, useState } from "react";
import * as Yup from "yup";
import BookingForm from "../components/BookingForm";

const formatTime = (time) => {
  let [hours, minutes] = time.split(":");
  let parsedHours = parseInt(hours, 10);
  let period = parsedHours >= 12 ? "PM" : "AM";
  let formattedHours = parsedHours % 12 || 12;
  return `${formattedHours}:${minutes} ${period}`;
};

export const loadReservedTimes = () => {
  const storedTimes = localStorage.getItem("reservedTimes");
  return storedTimes ? JSON.parse(storedTimes) : {};
};

export const loadFullyBookedDates = () => {
  const storedDates = localStorage.getItem("fullyBookedDates");
  return storedDates ? JSON.parse(storedDates) : [];
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
  const [fullyBookedDates, setFullyBookedDates] = useState(loadFullyBookedDates());
  const [timesLoading, setTimesLoading] = useState(true);
  const [timesErrorMessage, setTimesErrorMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

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
  };

  const validationSchema = Yup.object({
    selectedTimeRaw: Yup.string()
      .required(),
    firstName: Yup.string()
      .min(2, "Minimum of 2 characters are required")
      .max(50, "Maximum of 50 characters is allowed")
      .required("First name is required"),
    lastName: Yup.string()
      .min(2, "Minimum of 2 characters are required")
      .max(50, "Maximum of 50 characters is allowed")
      .required("Last name is required"),
    userEmail: Yup.string()
      .email("Please enter a valid email, like name@email.com")
      .required("Email is required"),
    specialRequests: Yup.string()
      .max(500, "Maximum of 500 characters is allowed")
  });

  const validateField = async (field, value) => {
    try {
      await validationSchema.validateAt(field, { [field]: value });
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [field]: error.message }));
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => {
      let updatedForm = { ...prev, [field]: value };
      if (field === "selectedDate") {
        updatedForm.selectedTimeRaw = "";
        updatedForm.selectedTimeDisplay = "";
      }
      if (touchedFields[field]) {
        validateField(field, value);
      }
      return updatedForm;
    });
  };

  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
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

  useEffect(() => {
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => setIsFormValid(true))
      .catch(() => setIsFormValid(false));
  }, [formData, validationSchema]);

  return (
    <section aria-label="Booking Details">
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        formData={formData}
        onFormChange={handleFormChange}
        onBlur={handleBlur}
        resetFormData={resetFormData}
        reservedTimes={reservedTimes}
        setReservedTimes={setReservedTimes}
        fullyBookedDates={fullyBookedDates}
        setFullyBookedDates={setFullyBookedDates}
        timesErrorMessage={timesErrorMessage}
        timesLoading={timesLoading}
        isFormValid={isFormValid}
        errors={errors}
      />
    </section>
  );
};

export default Main;
