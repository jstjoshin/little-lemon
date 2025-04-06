import React from "react";
import Select from "react-select";
import iconOccasion from '../images/icon-occasion.svg';
import iconBirthday from '../images/icon-birthday.svg';
import iconAnniversary from '../images/icon-anniversary.svg';
import iconEngagement from '../images/icon-engagement.svg';

const options = [
  { value: "None", label: "None", icon: iconOccasion },
  { value: "Birthday", label: "Birthday", icon: iconBirthday },
  { value: "Engagement", label: "Engagement", icon: iconEngagement },
  { value: "Anniversary", label: "Anniversary", icon: iconAnniversary },
];

const OccasionSelector = ({ formData, onChange, customSelectStyles }) => {
  const handleChange = (option) => {
    onChange("selectedOccasion", option.value);
  };
  const extendStyles = {
    ...customSelectStyles,
    placeholder: (provided) => ({
      ...provided,
      backgroundImage: `url(${iconOccasion})`,
      backgroundPosition: 'left center',
      backgroundRepeat: 'no-repeat',
      paddingLeft: '3.1rem',
    })
  };

  return (
    <>
      <Select
        value={options.find((opt) => opt.value === formData.selectedOccasion)}
        onChange={handleChange}
        options={options}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        isSearchable={false}
        styles={extendStyles}
        aria-label="Select an occasion, this is optional"
        className="occasion-selector"
        classNamePrefix="custom-select"
        placeholder="Occasion (optional)"
        formatOptionLabel={({label, icon }, { context }) =>
          context === "value" ? (
            <div className="select-background" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <img src={icon} alt="" aria-hidden="true" />
              <span>{`Occasion: ${label}`}</span>
            </div>
          ) : (
            <span>{label}</span>
          )
        }
      />
    </>
  );
};

export default OccasionSelector;
