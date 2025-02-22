import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "None", label: "None" },
  { value: "Birthday", label: "Birthday" },
  { value: "Engagement", label: "Engagement" },
  { value: "Anniversary", label: "Anniversary" },
];

const OccasionSelector = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Occasion (optional)"
        formatOptionLabel={(option, { context }) =>
          context === "value"
            ? `Occasion: ${option.label}` // Displayed on selection
            : option.label // Displayed in dropdown
        }
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
      />
    </>
  );
};

export default OccasionSelector;
