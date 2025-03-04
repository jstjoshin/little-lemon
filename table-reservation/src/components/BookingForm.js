import React from "react";
import { useNavigate } from "react-router-dom";
import DateSelector from "../components/DateSelector";
import GroupSizeSelector from "../components/GroupSizeSelector";
import OccasionSelector from "../components/OccasionSelector";
import SeatingSelector from "../components/SeatingSelector";
import TimeOptions from "../components/TimeOptions";
import ContactDetails from "../components/ContactDetails";

const BookingForm = ({ availableTimes, dispatch, formData, onFormChange, resetFormData, reservedTimes, setReservedTimes }) => {
  const navigate = useNavigate();
  const handleChange = (field, value) => {
    onFormChange(field, value);
    if (field === "selectedDate") {
      dispatch({ type: "UPDATE_TIMES", payload: { times: window.fetchAPI(new Date(value)), date: value, reservedTimes } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionSuccess = window.submitAPI(formData);

    if (submissionSuccess) {
      console.log("Form submitted successfully to the API", formData);
      setReservedTimes((prev) => {
        const updatedTimes = {
          ...prev,
          [formData.selectedDate]: [...(prev[formData.selectedDate] || []), formData.selectedTimeRaw],
        };
        localStorage.setItem("reservedTimes", JSON.stringify(updatedTimes));
        return updatedTimes;
      });
      dispatch({ type: "SUBMIT_FORM", payload: formData });
      navigate("/confirmed-booking");
      resetFormData();
    } else {
      console.error("Form submission to API failed.");
      alert("Form submission failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <section className="booking-selectors">
          <DateSelector formData={formData} onChange={handleChange} dispatch={dispatch}/>
          <GroupSizeSelector formData={formData} onChange={handleChange} />
          <SeatingSelector formData={formData} onChange={handleChange} />
          <OccasionSelector formData={formData} onChange={handleChange} />
        </section>
        <section>
          <h3>Select a Time</h3>
          <TimeOptions formData={formData} onChange={handleChange} availableTimes={availableTimes} dispatch={dispatch} />
        </section>
        <section>
          <h3>Contact Information</h3>
          <ContactDetails formData={formData} onChange={handleChange} />
        </section>
        <button type="submit">Complete Reservation</button>
      </fieldset>
    </form>
  );
};

export default BookingForm;
