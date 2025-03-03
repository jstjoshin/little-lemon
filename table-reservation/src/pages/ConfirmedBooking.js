import React from 'react';
import Hero from "../components/Hero";

const ConfirmedBooking = ({heroImg}) => {
  return (
    <main>
      <Hero isHomePage={false} heroImg={heroImg} />
      <section>
        <h1>Booking Complete!</h1>
      </section>
    </main>
  );
};

export default ConfirmedBooking;
