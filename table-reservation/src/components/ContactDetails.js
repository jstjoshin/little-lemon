import React from "react";

const ContactDetails = ({ formData, onChange }) => {
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
          />
        </span>
        <span className="field">
          <label htmlFor="last-name">Last Name*</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
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
        />
      </span>
      <span className="field">
        <label htmlFor="special-requests">Special Requests (optional)</label>
        <textarea
          type="text"
          id="special-requests"
          name="special-requests"
          value={formData.specialRequests}
          onChange={(e) => onChange("specialRequests", e.target.value)}
        />
      </span>
    </section>
  );
};

export default ContactDetails;
