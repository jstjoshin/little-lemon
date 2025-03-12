import React from 'react';
import Nav from "./Nav";

const Footer = ({logo}) => {

  return (
    <footer aria-label="Site Footer">
      <section>
        <img src={logo} alt="Little Lemon logo"/>
        <Nav isHeader={false} />
      </section>
    </footer>
  );
};

export default Footer;
