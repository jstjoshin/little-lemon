import React from 'react';
import NavMenu from "./NavMenu";
import ContactMenu from "./ContactMenu";
import SocialMenu from "./SocialMenu";

const Nav = ({ isHeader = false }) => {
  const noClick = (e) => {
    e.preventDefault()
    e.target.style.cursor = "not-allowed";
    e.target.setAttribute("title", "--- Ooops, this feature is not yet available ---");
  };
  return (
    <nav aria-label={isHeader ? "Primary Navigation" : "Footer Navigation"}>
      {isHeader ? (
        <>
          <NavMenu noClick={noClick} />
        </>
      ) : (
        <>
          <h5 id="footer-navigation-heading">Navigation</h5>
          <NavMenu noClick={noClick} />
          <h5 id="contact-heading">Contact</h5>
          <ContactMenu noClick={noClick} />
          <h5 id="social-media-heading">Social Media</h5>
          <SocialMenu noClick={noClick} />
        </>
      )}
    </nav>
  );
};

export default Nav;