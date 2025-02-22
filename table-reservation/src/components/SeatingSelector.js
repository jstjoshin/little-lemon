import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "Inside Seating", label: "Inside Seating" },
  { value: "Outside Seating", label: "Outside Seating" }
];

const SeatingSelector = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </>
  );
};

export default SeatingSelector;
