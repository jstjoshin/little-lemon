import React from "react";

const TimeOptions = ({ formData, onChange, availableTimes }) => {

  return (
    <section>
      {availableTimes
      .filter(({ available }) => available)
      .map(({ rawTime, displayTime, available }) => (
        <button
          key={rawTime}
          type="button"
          onClick={() => {
            onChange("selectedTimeRaw", rawTime)
            onChange("selectedTimeDisplay", displayTime)
          }}
          disabled={!available}
          style={{
            margin: "5px",
            padding: "10px",
            backgroundColor: formData.selectedTimeDisplay === displayTime ? "#512DA8" : "#ddd",
            color: formData.selectedTimeDisplay === displayTime ? "#fff" : "#000",
          }}
        >
          {displayTime}
        </button>
      ))}
    </section>
  );
};

export default TimeOptions;
