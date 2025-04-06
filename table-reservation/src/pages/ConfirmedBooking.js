import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import ReservationDetails from "../components/ReservationDetails";
import ReservationActions from "../components/ReservationActions";
import LocationDetails from "../components/LocationDetails";

const ConfirmedBooking = ({heroImg, noClick}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  return (
    <main aria-labelledby="confirmation-heading" className='booking-confirmation'>
      <Hero isHomePage={false} heroImg={heroImg} />
      <section>
        <header>
          <h1 id="confirmation-heading">Your table is reserved!</h1>
        </header>
        <section aria-label="Reservation Details" className='reservation-details'>
          <ReservationDetails formData={formData} />
        </section>
        <section aria-label="Manage Your Reservation" className='reservation-actions'>
          <ReservationActions navigate={navigate} formData={formData} />
        </section>
        <section aria-label="Restaurant Location" className='location-details'>
          <LocationDetails noClick={noClick}/>
        </section>
      </section>
    </main>
  );
};

export default ConfirmedBooking;
