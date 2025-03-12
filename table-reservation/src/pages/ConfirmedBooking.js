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
    <main aria-label="Your reservation with Little Lemon was successful">
      <Hero isHomePage={false} heroImg={heroImg} />
      <section>
        <h1>Your table is reserved!</h1>
        <section>
          <ReservationDetails formData={formData} />
        </section>
        <section>
          <ReservationActions navigate={navigate} formData={formData}/>
        </section>
        <section>
          <LocationDetails />
        </section>
      </section>
    </main>
  );
};

export default ConfirmedBooking;
