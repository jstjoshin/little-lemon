import React from 'react';
import NavMenu from "./NavMenu";
import ContactMenu from "./ContactMenu";
import SocialMenu from "./SocialMenu";

const Nav = ({ isHeader = false }) => {
  return (
    <nav>
      {isHeader ? (
        <>
          <NavMenu />
        </>
      ) : (
        <>
          <h5>Doormat Navigation</h5>
          <NavMenu />
          <h5>Contact</h5>
          <ContactMenu />
          <h5>Social Media Links</h5>
          <SocialMenu />
        </>
      )}
    </nav>
  );
};

export default Nav;