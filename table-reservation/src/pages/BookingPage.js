import React from 'react';
import Hero from "../components/Hero";
import Booking from "../components/Booking";

const BookingPage = ({heroImg}) => {
  return (
    <main>
      <Hero isHomePage={false} heroImg={heroImg} />
      <Booking />
    </main>
  );
};

export default BookingPage;
