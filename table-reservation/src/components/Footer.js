import React from 'react';

const Footer = ({logo}) => {

  return (
    <nav>
      <img src={logo} alt="logo"/>
      <div>
        <h5>Doormat Navigation</h5>
        <menu>
          <li><a href="/home">Home</a></li>
          <li><a href="/home">About</a></li>
          <li><a href="/home">Menu</a></li>
          <li><a href="/home">Reservations</a></li>
          <li><a href="/home">Order Online</a></li>
          <li><a href="/home">Login</a></li>
        </menu>
      </div>
      <div>
        <h5>Contact</h5>
        <menu>
          <li><a href="/home">Address</a></li>
          <li><a href="/home">Phone Number</a></li>
          <li><a href="/home">Email</a></li>
        </menu>
      </div>
      <div>
        <h5>Social Media Links</h5>
        <menu>
          <li><a href="/home">Facebook</a></li>
          <li><a href="/home">Instagram</a></li>
          <li><a href="/home">Yelp</a></li>
        </menu>
      </div>
    </nav>
  );
};

export default Footer;
