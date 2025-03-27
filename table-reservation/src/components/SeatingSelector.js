import React, { useEffect } from "react";
import Select from "react-select";
import iconSeatInside from '../images/icon-inside-seat.svg';
import iconSeatOutside from '../images/icon-outside-seat.svg';

const options = [
  { value: "Inside Seating", label: "Inside Seating", icon: iconSeatInside },
  { value: "Outside Seating", label: "Outside Seating", icon: iconSeatOutside }
];

const SeatingSelector = ({ formData, onChange, customSelectStyles }) => {
  useEffect(() => {
      if (!formData.selectedSeating) {
        onChange("selectedSeating", "Inside Seating");
      }
    }, [formData.selectedSeating, onChange]);
  const handleChange = (option) => {
    onChange("selectedSeating", option.value);
  };
  return (
    <>
      <Select
        value={options.find((opt) => opt.value === formData.selectedSeating)}
        onChange={handleChange}
        options={options}
        isSearchable={false}
        styles={customSelectStyles}
        aria-label="Select your desired seating type"
        className="seating-selector"
        classNamePrefix="custom-select"
        formatOptionLabel={({ label, icon }, { context }) =>
          context === "value" ? (
            <div className="select-background" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <img src={icon} alt="" aria-hidden="true" />
              <span>{label}</span>
            </div>
          ) : (
            <span>{label}</span>
          )
        }
      />
    </>
  );
};

export default SeatingSelector;
