import React from "react";
import Select from "react-select";

const options = [
  { value: "None", label: "None" },
  { value: "Birthday", label: "Birthday" },
  { value: "Engagement", label: "Engagement" },
  { value: "Anniversary", label: "Anniversary" },
];

const OccasionSelector = ({ formData, onChange }) => {
  const handleChange = (option) => {
    onChange("selectedOccasion", option.value);
  };
  return (
    <>
      <Select
        value={options.find((opt) => opt.value === formData.selectedOccasion)}
        onChange={handleChange}
        options={options}
        placeholder="Occasion (optional)"
        formatOptionLabel={(option, { context }) =>
          context === "value"
            ? `Occasion: ${option.label}`
            : option.label
        }
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
      />
    </>
  );
};

export default OccasionSelector;
