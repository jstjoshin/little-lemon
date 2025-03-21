import React from 'react';
import Nav from "./Nav";

const Footer = ({logo, noClick}) => {

  return (
    <footer aria-label="Site Footer">
      <section>
        <img src={logo} alt="Little Lemon logo"/>
        <Nav isHeader={false} noClick={noClick}/>
      </section>
      <p>© 2025 Little Lemon Restaurant</p>
    </footer>
  );
};

export default Footer;
