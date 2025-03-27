import React from 'react';
import Hero from "../components/Hero";
import BookingMain from "../components/BookingMain";

const BookingPage = ({heroImg}) => {
  return (
    <main aria-labelledby="booking-heading" className="booking-page">
      <Hero isHomePage={false} heroImg={heroImg} />
      <section>
        <header>
          <h1 id="booking-heading">Reserve a Table</h1>
        </header>
        <BookingMain aria-labelledby="booking-heading" />
      </section>
    </main>
  );
};

export default BookingPage;
