import React from 'react';
import HeroHome from "./HeroHome";
import HeroBooking from "./HeroBooking";

const Hero = ({ heroImg, isHomePage = false }) => {
  return (
    <section class="hero">
      {isHomePage ? (
        <>
          <HeroHome heroImg={heroImg}/>
        </>
      ) : (
        <>
          <HeroBooking heroImg={heroImg}/>
        </>
      )}
    </section>
  );
};

export default Hero;
