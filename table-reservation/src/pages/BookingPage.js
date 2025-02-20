import React from 'react';
import Hero from "../components/Hero";

const BookingPage = ({heroImg}) => {
  return (
    <main>
      <Hero isHomePage={false} heroImg={heroImg} />
    </main>
  );
};

export default BookingPage;
