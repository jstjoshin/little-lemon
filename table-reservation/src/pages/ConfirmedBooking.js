import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import ReservationDetails from "../components/ReservationDetails";
import ReservationActions from "../components/ReservationActions";
import LocationDetails from "../components/LocationDetails";

const ConfirmedBooking = ({heroImg}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  return (
    <main aria-labelledby="confirmation-heading">
      <Hero isHomePage={false} heroImg={heroImg} />
      <section>
        <header>
          <h1 id="confirmation-heading">Your table is reserved!</h1>
        </header>
        <section aria-label="Reservation Details">
          <ReservationDetails formData={formData} />
        </section>
        <section aria-label="Manage Your Reservation">
          <ReservationActions navigate={navigate} formData={formData}/>
        </section>
        <section aria-label="Restaurant Location">
          <LocationDetails />
        </section>
      </section>
    </main>
  );
};

export default ConfirmedBooking;
