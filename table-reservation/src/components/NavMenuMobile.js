import React from 'react';
import { NavLink } from "react-router-dom";

const NavMenuMobile = ({ noClick, menuOpen, toggleMenu }) => {
  return (
    <menu role="menu" aria-label="Main Navigation" className={`nav-menu-mobile ${menuOpen ? "open" : ""}`} >
      <li role="menuitem">
        <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
      </li>
      <li role="menuitem">
        <NavLink to="/#about" onClick={toggleMenu}>About</NavLink>
      </li>
      <li role="menuitem">
        <NavLink to="/menu" onClick={noClick} aria-describedby="disabled-description">Menu</NavLink>
      </li>
      <li role="menuitem">
        <NavLink to="/booking" onClick={toggleMenu}>Reservations</NavLink>
      </li>
      <li role="menuitem">
        <NavLink to="/order" onClick={noClick} aria-describedby="disabled-description">Order Online</NavLink>
      </li>
      <li role="menuitem">
        <NavLink to="/login" onClick={noClick} aria-describedby="disabled-description">Login</NavLink>
      </li>
    </menu>
  );
};

export default NavMenuMobile;