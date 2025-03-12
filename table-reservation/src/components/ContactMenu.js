import React from 'react';

const ContactMenu = ({ noClick }) => (
  <menu role="menu" aria-label="Contact Information">
    <li role="menuitem">
      <a href="/contact" onClick={noClick} aria-describedby="disabled-description" >Address</a>
    </li>
    <li role="menuitem">
      <a href="/contact" onClick={noClick} aria-describedby="disabled-description" >Phone Number</a>
    </li>
    <li role="menuitem">
      <a href="/contact" onClick={noClick} aria-describedby="disabled-description" >Email</a>
    </li>
  </menu>
);

export default ContactMenu;