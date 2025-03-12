import React from 'react';
import { NavLink } from "react-router-dom";

const HeroHome = ({heroImg}) => {
  return (
    <>
      <img src={heroImg} alt="Server holding a tray of Hors d’œuvres" className="hero-img-home"/>
      <header>
        <h1 id="hero-heading" >Little Lemon</h1>
        <h2>Chicago</h2>
      </header>
      <p>
        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
      </p>
      <NavLink to="/booking" aria-label="Reserve a table at Little Lemon">Reserve a Table</NavLink>
    </>
  );
};

export default HeroHome;
