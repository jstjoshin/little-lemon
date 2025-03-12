import React from 'react';
import Hero from "../components/Hero";
import Specials from "../components/Specials";
import Testimonials from "../components/Testimonials";
import About from "../components/About";

const HomePage = ({heroImg}) => {
  return (
    <main aria-label="Welcome to Little Lemon">
      <Hero isHomePage={true} heroImg={heroImg} />
      <Specials />
      <Testimonials />
      <About />
    </main>
  );
};

export default HomePage;
