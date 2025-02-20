import React from 'react';

const HeroHome = ({heroImg}) => {
  return (
    <>
      <img src={heroImg} alt="Server with tray of food" class="hero-img-home"/>
      <header>
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
      </header>
      <p>
        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
      </p>
      <button>Reserve a Table</button>
    </>
  );
};

export default HeroHome;
