import React from 'react';
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  return (
    <menu>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/menu">Menu</NavLink>
      </li>
      <li>
        <NavLink to="/booking">Reservations</NavLink>
      </li>
      <li>
        <NavLink to="/order">Order Online</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </menu>
  );
};

export default NavMenu;