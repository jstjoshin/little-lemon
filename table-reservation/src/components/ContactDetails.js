import React from "react";

const ContactDetails = ({ formData, onChange, errors, onBlur }) => {
  return (
    <section>
      <span className="field-row">
        <span className="field">
          <label htmlFor="first-name">First Name*</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            onBlur={() => onBlur("firstName")}
            aria-required="true"
            aria-describedby="first-name-error"
          />
          {errors.firstName && <p id="first-name-error" role="alert">{errors.firstName}</p>}
        </span>
        <span className="field">
          <label htmlFor="last-name">Last Name*</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            onBlur={() => onBlur("lastName")}
            aria-required="true"
            aria-describedby="last-name-error"
          />
          {errors.lastName && <p id="last-name-error" role="alert" style={{ color: "red" }}>{errors.lastName}</p>}
        </span>
      </span>
      <span className="field">
        <label htmlFor="user-email">Email*</label>
        <input
          type="email"
          id="user-email"
          name="user-email"
          value={formData.userEmail}
          onChange={(e) => onChange("userEmail", e.target.value)}
          onBlur={() => onBlur("userEmail")}
          aria-required="true"
          aria-describedby="email-error"
        />
        {errors.userEmail && <p id="email-error" role="alert" style={{ color: "red" }}>{errors.userEmail}</p>}
      </span>
      <span className="field">
        <label htmlFor="special-requests">Special Requests (optional)</label>
        <textarea
          type="text"
          id="special-requests"
          name="special-requests"
          value={formData.specialRequests}
          onChange={(e) => onChange("specialRequests", e.target.value)}
          onBlur={() => onBlur("specialRequests")}
          aria-required="false"
          aria-describedby="special-requests-error"
        />
        {errors.specialRequests && <p id="special-requests-error" role="alert" style={{ color: "red" }}>{errors.specialRequests}</p>}
      </span>
    </section>
  );
};

export default ContactDetails;
