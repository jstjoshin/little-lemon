import React from 'react';
import { NavLink } from "react-router-dom";

const NavMenu = ({ noClick }) => {
  return (
    <menu role="menu" aria-label="Main Navigation" className="nav-menu" >
      <li role="menuitem">
        <NavLink to="/">Home</NavLink>
      </li>
      <li role="menuitem">
        <NavLink to="/#about" className="section-link">About</NavLink>
      </li>
      <li role="menuitem">
        <NavLink to="/menu" onClick={noClick} aria-describedby="disabled-description">Menu</NavLink>
      </li>
      <li role="menuitem">
        <NavLink to="/booking">Reservations</NavLink>
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

export default NavMenu;