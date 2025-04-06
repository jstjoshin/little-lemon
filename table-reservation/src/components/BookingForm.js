import React from "react";
import { useNavigate } from "react-router-dom";
import DateSelector from "../components/DateSelector";
import GroupSizeSelector from "../components/GroupSizeSelector";
import OccasionSelector from "../components/OccasionSelector";
import SeatingSelector from "../components/SeatingSelector";
import TimeOptions from "../components/TimeOptions";
import ContactDetails from "../components/ContactDetails";
import iconDropdown from '../images/icon-dropdown.svg';
import iconCheckGrn from '../images/icon-check-grn.svg';
import iconCheckWht from '../images/icon-check-wht.svg';

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
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: () => ({
      padding: 0,
      backgroundImage: `url(${iconDropdown})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '1.2rem',
      height: '1.2rem',
      color: 'transparent',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      backgroundImage: state.isSelected ? `url(${iconCheckGrn})` : "none",
      backgroundPosition: 'left 1rem center',
      backgroundRepeat: 'no-repeat',
      padding: '1rem 1rem 1rem 3.125rem',
      color: state.isSelected ? "var(--black)" : "var(--black)",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontWeight: 'var(--font-weight-bold)',
      fontSize: 'var(--font-size-sm)',
      "&:hover": {
        cursor: "pointer",
        backgroundColor: 'var(--primary-green)',
        backgroundImage: state.isSelected ? `url(${iconCheckWht})` : "none",
        color: 'var(--white)',
      },
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '0.7rem',
      borderRadius: '0.3125rem',
      boxShadow: 'var(--drop-shadow)',
      padding: '0.25rem 0',
    }),
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <section className="booking-selectors">
          <DateSelector formData={formData} onChange={handleChange} dispatch={dispatch} fullyBookedDates={fullyBookedDates} iconDropdown={iconDropdown} />
          <GroupSizeSelector formData={formData} onChange={handleChange} customSelectStyles={customSelectStyles} />
          <SeatingSelector formData={formData} onChange={handleChange} customSelectStyles={customSelectStyles} />
          <OccasionSelector formData={formData} onChange={handleChange} customSelectStyles={customSelectStyles} />
        </section>
        <section className="times-available">
          <span className="heading">
            <h3>Select a Time</h3>
            <p>(required)</p>
          </span>
          <TimeOptions formData={formData} onChange={handleChange} availableTimes={availableTimes} dispatch={dispatch} timesErrorMessage={timesErrorMessage} timesLoading={timesLoading} />
        </section>
        <section className="contact-info">
          <h3>Contact Information</h3>
          <ContactDetails formData={formData} onChange={handleChange} errors={errors} onBlur={onBlur} />
        </section>
        <button className="btn-submit" type="submit" disabled={!isFormValid} aria-disabled={!isFormValid}>Complete Reservation</button>
      </fieldset>
    </form>
  );
};

export default BookingForm;
