import React from 'react';
import Nav from "./Nav";

const Header = ({logo, noClick}) => {
  return (
    <header aria-label="Site Header">
      <section>
        <img src={logo} alt="Little Lemon logo"/>
        <Nav isHeader={true} noClick={noClick}/>
      </section>
    </header>
  );
};

export default Header;
