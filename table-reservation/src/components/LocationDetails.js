import React from 'react';
import mapImg from '../images/little-lemon-map.svg';

const LocationDetails = ({noClick}) => {
  return (
    <>
      <img src={mapImg} alt="Location map for little lemon resturaunt." className="map-img-location"/>
      <section>
        <h5>Location</h5>
        <p>
          1956 W Division St <br />
          Chicago, IL 70623
        </p>
        <h5>Phone</h5>
        <a href="tel:+1234567890" onclick="return false;" role="presentation" aria-label="Call Little Lemon at +1234567890" onClick={noClick} aria-describedby="disabled-description">+1 (234) 567-8900</a>
      </section>
    </>
  );
};

export default LocationDetails;
