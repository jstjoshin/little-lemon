import React from 'react';
import Hero from "../components/Hero";
import BookingMain from "../components/BookingMain";

const BookingPage = ({heroImg}) => {
  return (
    <main>
      <Hero isHomePage={false} heroImg={heroImg} />
      <section>
        <h1>Reserve a Table</h1>
        <BookingMain />
      </section>
    </main>
  );
};

export default BookingPage;
