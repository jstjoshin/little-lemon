import React from 'react';
import Nav from "./Nav";

const Header = ({logo}) => {

  return (
    <header>
      <img src={logo} alt="logo"/>
      <Nav />
    </header>
  );
};

export default Header;
