import React from 'react';
import iconCalSelect from '../images/icon-cal-select.svg';
import iconTime from '../images/icon-time.svg';
import iconGroupSize from '../images/icon-group-size.svg';
import iconSeatInside from '../images/icon-inside-seat.svg';
import iconSeatOutside from '../images/icon-outside-seat.svg';
import iconOccasion from '../images/icon-occasion.svg';
import iconOccasionAnniversary from '../images/icon-anniversary.svg';
import iconOccasionEngagement from '../images/icon-engagement.svg';
import iconOccasionBirthday from '../images/icon-birthday.svg';

const ReservationDetails = ({ formData }) => {
  const reFormattedDate = new Date(formData.selectedDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const iconsOccasion = {
    None: iconOccasion,
    Birthday: iconOccasionBirthday,
    Engagement: iconOccasionEngagement,
    Anniversary: iconOccasionAnniversary,
  };

  return (
    <>
      <section>
        <span>
          <img src={iconCalSelect} alt="Icon for reserved date." className="icon-details"/>
          <p>{reFormattedDate}</p>
        </span>
        <span>
          <img src={iconTime} alt="Icon for reserved time." className="icon-details"/>
          <p>{formData.selectedTimeDisplay}</p>
        </span>
        <span>
          <img src={iconGroupSize} alt="Icon for reserved group size." className="icon-details"/>
          <p>{formData.groupSize}</p>
        </span>
        <span>
          <img
            src={formData.selectedSeating === "Inside Seating" ? iconSeatInside : iconSeatOutside}
            alt={`Icon for reserved seating, ${formData.selectedSeating}`}
            className="icon-details"
          />
          <p>{formData.selectedSeating}</p>
        </span>
        <span>
          <img
            src={iconsOccasion[formData.selectedOccasion] || iconOccasion}
            alt={`Icon for reserved occasion, ${formData.selectedOccasion || "none selected"}`}
            className="icon-details"
          />
          <p>Occasion: {formData.selectedOccasion || "None"}</p>
        </span>
      </section>
      <section>
        <p>Name: {formData.firstName} {formData.lastName}</p>
        <p>Email: {formData.userEmail}</p>
        <p>Special Requests: {formData.specialRequests || "None"}</p>
      </section>
    </>
  );
};

export default ReservationDetails;
