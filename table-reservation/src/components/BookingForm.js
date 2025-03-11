import React from "react";
import { useNavigate } from "react-router-dom";
import DateSelector from "../components/DateSelector";
import GroupSizeSelector from "../components/GroupSizeSelector";
import OccasionSelector from "../components/OccasionSelector";
import SeatingSelector from "../components/SeatingSelector";
import TimeOptions from "../components/TimeOptions";
import ContactDetails from "../components/ContactDetails";

const BookingForm = ({ availableTimes, dispatch, formData, onFormChange, resetFormData, reservedTimes, setReservedTimes, timesErrorMessage, timesLoading, isFormValid, errors, onBlur, fullyBookedDates, setFullyBookedDates }) => {
  const navigate = useNavigate();
  const handleChange = async (field, value) => {
    onFormChange(field, value);
    if (field === "selectedDate") {
      if (!window.fetchAPI) {
        console.warn("API is unavailable. Cannot fetch available times.");
        dispatch({ type: "UPDATE_TIMES", payload: { times: [], date: value, reservedTimes } });
        return;
      }
      dispatch({ type: "UPDATE_TIMES", payload: { times: window.fetchAPI(new Date(value)), date: value, reservedTimes } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    const submissionSuccess = window.submitAPI(formData);

    if (submissionSuccess) {
      console.log("Form submitted successfully to the API", formData);
      setReservedTimes((prev) => {
        const updatedTimes = {
          ...prev,
          [formData.selectedDate]: [...(prev[formData.selectedDate] || []), formData.selectedTimeRaw],
        };
        localStorage.setItem("reservedTimes", JSON.stringify(updatedTimes));

      const allAvailableTimes = window.fetchAPI(new Date(formData.selectedDate));
      const bookedTimes = updatedTimes[formData.selectedDate];

      if (bookedTimes.length >= allAvailableTimes.length) {
        setFullyBookedDates((prevFullyBooked) => {
          const updatedFullyBooked = [...prevFullyBooked, formData.selectedDate];
          localStorage.setItem("fullyBookedDates", JSON.stringify(updatedFullyBooked));
          return updatedFullyBooked;
        });
      }

        return updatedTimes;
      });
      dispatch({ type: "SUBMIT_FORM", payload: formData });
      navigate("/confirmed-booking", { state: { formData } });
      resetFormData();
    } else {
      console.error("Form submission to API failed.");
      alert("Form submission failed. Please try again.");
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      "&:hover": {
        cursor: "pointer",
      },
    }),
    menu: (provided) => ({
      ...provided,
    }),
    option: (provided, state) => ({
      ...provided,
      "&:hover": {
        cursor: "pointer",
      },
    }),
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <section className="booking-selectors">
          <DateSelector formData={formData} onChange={handleChange} dispatch={dispatch} fullyBookedDates={fullyBookedDates}/>
          <GroupSizeSelector formData={formData} onChange={handleChange} customSelectStyles={customSelectStyles} />
          <SeatingSelector formData={formData} onChange={handleChange} customSelectStyles={customSelectStyles} />
          <OccasionSelector formData={formData} onChange={handleChange} customSelectStyles={customSelectStyles} />
        </section>
        <section>
          <h3>Select a Time</h3><p>(required)</p>
          <TimeOptions formData={formData} onChange={handleChange} availableTimes={availableTimes} dispatch={dispatch} timesErrorMessage={timesErrorMessage} timesLoading={timesLoading} />
        </section>
        <section>
          <h3>Contact Information</h3>
          <ContactDetails formData={formData} onChange={handleChange} errors={errors} onBlur={onBlur} />
        </section>
        <button type="submit" disabled={!isFormValid}>Complete Reservation</button>
      </fieldset>
    </form>
  );
};

export default BookingForm;
