import React, { useState } from "react";
import DateSelector from "../components/DateSelector";
import GroupSizeSelector from "../components/GroupSizeSelector";
import OccasionSelector from "../components/OccasionSelector";
import SeatingSelector from "../components/SeatingSelector";
import TimeOptions from "../components/TimeOptions";
import ContactDetails from "../components/ContactDetails";

const BookingForm = ({ availableTimes, dispatch }) => {

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

  const handleChange = (field, value) => {
    setFormData((dataSet) => ({ ...dataSet, [field]: value }));
    if (field === "selectedDate") {
      dispatch({ type: "UPDATE_TIMES", payload: value });
    }
  };

  const handleSubmit = (e, field) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_FORM", payload: formData });
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
    console.log("form submitted", formData);
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
