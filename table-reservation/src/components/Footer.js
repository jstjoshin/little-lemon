import React from 'react';
import Nav from "./Nav";

const Footer = ({logo}) => {

  return (
    <footer>
      <section>
        <img src={logo} alt="logo"/>
        <Nav isHeader={false} />
      </section>
    </footer>
  );
};

export default Footer;
