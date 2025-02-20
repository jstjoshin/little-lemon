import React from 'react';
import Nav from "./Nav";

const Header = ({logo}) => {

  return (
    <header>
      <section>
        <img src={logo} alt="logo"/>
        <Nav isHeader={true} />
      </section>
    </header>
  );
};

export default Header;
