import React, { useEffect } from "react";
import Select from "react-select";

const options = [
  { value: "1 Person", label: "1 Person" },
  { value: "2 People", label: "2 People" },
  { value: "3 People", label: "3 People" },
  { value: "4 People", label: "4 People" },
  { value: "5 People", label: "5 People" },
  { value: "6 People", label: "6 People" },
  { value: "7 People", label: "7 People" },
  { value: "8 People", label: "8 People" },
  { value: "9 People", label: "9 People" },
  { value: "10 People", label: "10 People" },
  { value: "11 People", label: "11 People" },
  { value: "12 People", label: "12 People" },
  { value: "13 People", label: "13 People" },
  { value: "14 People", label: "14 People" },
  { value: "15 People", label: "15 People" },
  { value: "16 People", label: "16 People" },
  { value: "17 People", label: "17 People" },
  { value: "18 People", label: "18 People" },
  { value: "19 People", label: "19 People" },
  { value: "20 People", label: "20 People" }
];

const GroupSizeSelector = ({ formData, onChange, customSelectStyles }) => {
  useEffect(() => {
    if (!formData.groupSize) {
      onChange("groupSize", "2 People");
    }
  }, [formData.groupSize, onChange]);
  const handleChange = (option) => {
    onChange("groupSize", option.value);
  };
  return (
    <>
      <Select
        value={options.find((opt) => opt.value === formData.groupSize)}
        onChange={handleChange}
        options={options}
        isSearchable={false}
        styles={customSelectStyles}
        aria-label="Select the size of your group"
      />
    </>
  );
};

export default GroupSizeSelector;
