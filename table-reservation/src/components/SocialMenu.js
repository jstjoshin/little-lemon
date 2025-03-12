import React from 'react';

const SocialMediaMenu = ({ noClick }) => (
  <menu role="menu" aria-label="Social Media Links">
    <li role="menuitem">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" onClick={noClick} aria-describedby="disabled-description">Facebook</a>
    </li>
    <li role="menuitem">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" onClick={noClick} aria-describedby="disabled-description">Instagram</a>
    </li>
    <li role="menuitem">
      <a href="https://yelp.com" target="_blank" rel="noopener noreferrer" onClick={noClick} aria-describedby="disabled-description">Yelp</a>
    </li>
  </menu>
);

export default SocialMediaMenu;

