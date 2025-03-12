import React, { useEffect } from "react";
import Select from "react-select";

const options = [
  { value: "Inside Seating", label: "Inside Seating" },
  { value: "Outside Seating", label: "Outside Seating" }
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
      />
    </>
  );
};

export default SeatingSelector;
