import React from 'react';
import Nav from "./Nav";

const Header = ({logo}) => {
  return (
    <header aria-label="Site Header">
      <section>
        <img src={logo} alt="Little Lemon logo"/>
        <Nav isHeader={true} />
      </section>
    </header>
  );
};

export default Header;
