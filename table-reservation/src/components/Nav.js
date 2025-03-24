import React, { useState, useEffect } from 'react';
import { FocusTrap } from 'focus-trap-react';
import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";
import ContactMenu from "./ContactMenu";
import SocialMenu from "./SocialMenu";
import iconMenu from '../images/icon-menu.svg';
import iconMenuClose from '../images/icon-menu-close.svg';

const Nav = ({ isHeader = false, noClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 550);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
      if (!isMobile && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen, isMobile]);

  useEffect(() => {
    document.body.style.overflow = menuOpen && isMobile ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, isMobile]);

  return (
    <nav aria-label={isHeader ? "Primary Navigation" : "Footer Navigation"}>
      {isHeader ? (
        <>
          {isMobile ? (
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
              {menuOpen && (
                <FocusTrap
                  focusTrapOptions={{
                    clickOutsideDeactivates: true,
                    escapeDeactivates: true,
                    fallbackFocus: "#mobile-menu-container",
                  }}
                >
                  <div id="mobile-menu-container" >
                    <NavMenuMobile
                      noClick={noClick}
                      menuOpen={menuOpen}
                      toggleMenu={toggleMenu}
                    />
                  </div>
                </FocusTrap>
              )}
            </>
          ) : (
            <NavMenu noClick={noClick} />
          )}
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