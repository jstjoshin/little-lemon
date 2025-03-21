import React, { useState, useEffect } from 'react';
import NavMenu from "./NavMenu";
import ContactMenu from "./ContactMenu";
import SocialMenu from "./SocialMenu";
import iconMenu from '../images/icon-menu.svg';
import iconMenuClose from '../images/icon-menu-close.svg';

const Nav = ({ isHeader = false, noClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <nav aria-label={isHeader ? "Primary Navigation" : "Footer Navigation"}>
      {isHeader ? (
        <>
          <button
            className="btn-menu"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <img
              src={iconMenu}
              alt='menu icon open'
              aria-hidden="true"
              className={`btn-menu-img ${menuOpen ? "hidden" : "visible"}`}
            />
            <img
              src={iconMenuClose}
              alt='menu icon close'
              aria-hidden="true"
              className={`btn-menu-img ${menuOpen ? "visible" : "hidden"}`}
            />
          </button>
          <NavMenu noClick={noClick} menuOpen={menuOpen} toggleMenu={toggleMenu}/>
        </>
      ) : (
        <>
          <h4 id="footer-navigation-heading">Navigation</h4>
          <NavMenu noClick={noClick} />
          <h4 id="contact-heading">Contact</h4>
          <ContactMenu noClick={noClick} />
          <h4 id="social-media-heading">Social Media</h4>
          <SocialMenu noClick={noClick} />
        </>
      )}
    </nav>
  );
};

export default Nav;