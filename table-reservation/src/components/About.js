import React from 'react';
import imageChefsA from '../images/about-mario-adrian-a.jpg';
import imageChefsB from '../images/about-mario-adrian-b.jpg';

const About = () => {
  return (
    <section className='about' aria-label="About">
      <header>
        <h1>Little Lemon</h1>
        <h2>Two Chefs, One Dream</h2>
      </header>
      <span className="gallery">
        <img src={imageChefsA} alt="Mario and Adrian cooking together in the kitchen, discussing recipes." />
        <img src={imageChefsB} alt="Mario and Adrian sharing a laugh while preparing a dish." />
      </span>
      <p>
        Little Lemon was founded by chefs Mario and Adrian with a mission to bring authentic Italian flavors to their hometown of Chicago. Inspired by family recipes and traditional cooking techniques, they created a warm, inviting space where guests can enjoy handcrafted pasta, wood-fired pizzas, and classic Italian dishes made with the freshest ingredients. At Little Lemon, every meal is a celebration of rich flavors, quality ingredients, and the joy of sharing great food. Buon appetito! 🍋
      </p>
    </section>
  );
};

export default About;
