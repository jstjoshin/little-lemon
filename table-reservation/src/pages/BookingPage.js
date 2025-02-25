import React from 'react';
import Hero from "../components/Hero";
import BookingForm from "../components/BookingForm";

const BookingPage = ({heroImg}) => {
  return (
    <main>
      <Hero isHomePage={false} heroImg={heroImg} />
      <section>
        <h1>Reserve a Table</h1>
        <BookingForm />
      </section>
    </main>
  );
};

export default BookingPage;
