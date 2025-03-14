import React from 'react';
import iconPhone from '../images/icon-phone.svg';
import iconMail from '../images/icon-mail.svg';
import iconLocation from '../images/icon-location.svg';

const ContactMenu = ({ noClick }) => (
  <menu role="menu" aria-label="Contact Information">
    <li role="menuitem">
      <a href="/contact" onClick={noClick} aria-describedby="disabled-description" >
        <img
          src={iconPhone}
          alt=""
          role="presentation"
          className="icon-nav"
        />
        <span>
          1-234-567-8900
        </span>
      </a>
    </li>
    <li role="menuitem">
      <a href="/contact" onClick={noClick} aria-describedby="disabled-description" >
        <img
          src={iconMail}
          alt=""
          role="presentation"
          className="icon-nav"
        />
        <span>
          info@lillemon.com
        </span>
      </a>
    </li>
    <h5 aria-label="Location Information"><br />Location</h5>
    <li role="menuitem">
      <a href="/contact" onClick={noClick} aria-describedby="disabled-description" >
        <img
          src={iconLocation}
          alt=""
          role="presentation"
          className="icon-nav"
        />
        <span>
          1956 W Division St <br />
          Chicago, IL 70623
        </span>
      </a>
    </li>
  </menu>
);

export default ContactMenu;