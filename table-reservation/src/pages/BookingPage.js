import React from 'react';
import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm";

const BookingPage = ({heroImg}) => {
  return (
    <main>
      <Hero isHomePage={false} heroImg={heroImg} />
      <BookingForm />
    </main>
  );
};

export default BookingPage;
