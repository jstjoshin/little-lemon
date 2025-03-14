import React from 'react';
import iconFacebook from '../images/icon-facebook.svg';
import iconInstagram from '../images/icon-instagram.svg';
import iconYelp from '../images/icon-yelp.svg';
import iconYoutube from '../images/icon-youtube.svg';

const SocialMediaMenu = ({ noClick }) => (
  <menu role="menu" aria-label="Social Media Links" className='social-menu'>
    <li role="menuitem">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" onClick={noClick} aria-describedby="disabled-description">
        <img
          src={iconFacebook}
          alt="Facebook"
          className="icon-social"
        />
      </a>
    </li>
    <li role="menuitem">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" onClick={noClick} aria-describedby="disabled-description">
        <img
          src={iconInstagram}
          alt="Instagram"
          className="icon-social"
        />
      </a>
    </li>
    <li role="menuitem">
      <a href="https://yelp.com" target="_blank" rel="noopener noreferrer" onClick={noClick} aria-describedby="disabled-description">
        <img
          src={iconYelp}
          alt="Yelp"
          className="icon-social"
        />
      </a>
    </li>
    <li role="menuitem">
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" onClick={noClick} aria-describedby="disabled-description">
        <img
          src={iconYoutube}
          alt="Youtube"
          className="icon-social"
        />
      </a>
    </li>
  </menu>
);

export default SocialMediaMenu;

