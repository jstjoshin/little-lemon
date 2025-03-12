import React from 'react';

const HeroBooking = ({heroImg}) => {
  return (
    <>
      <img src={heroImg} alt="Dining table with food and drink" className="hero-img-booking"/>
      <h1 id="hero-heading" className="sr-only">Booking Page</h1>
    </>
  );
};

export default HeroBooking;

