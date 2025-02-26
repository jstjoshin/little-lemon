import React from "react";

const TimeOptions = ({ formData, onChange, availableTimes }) => {

  return (
    <section>
      {availableTimes
      .filter(({ available }) => available)
      .map(({ time, available }) => (
        <button
          key={time}
          type="button"
          onClick={() => onChange("selectedTime", time)}
          disabled={!available}
          style={{
            margin: "5px",
            padding: "10px",
            backgroundColor: formData.selectedTime === time ? "#512DA8" : "#ddd",
            color: formData.selectedTime === time ? "#fff" : "#000",
          }}
        >
          {time}
        </button>
      ))}
    </section>
  );
};

export default TimeOptions;
