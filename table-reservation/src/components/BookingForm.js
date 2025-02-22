import React from 'react';
import DateSelector from "../components/DateSelector";
import GroupSizeSelector from "../components/GroupSizeSelector";
import OccasionSelector from "../components/OccasionSelector";
import SeatingSelector from "../components/SeatingSelector";
import TimeOptions from "../components/TimeOptions";
import ContactDetails from "../components/ContactDetails";

const BookingForm = () => {
  return (
    <>
      <section>
        <h1>Reserve a Table</h1>
        <DateSelector />
        <GroupSizeSelector />
        <OccasionSelector />
        <SeatingSelector />
      </section>
      <TimeOptions />
      <ContactDetails />
      <button>Complete Reservation</button>
    </>
  );
};

export default BookingForm;
