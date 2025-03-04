import React from "react";

const TimeOptions = ({ formData, onChange, availableTimes }) => {
  const filteredTimes = availableTimes.filter(({ available }) => available);

  return (
    <section>
      {filteredTimes.length > 0 ? (
        filteredTimes.map(({ rawTime, displayTime, available }) => (
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
        ))
      ) : (
        <p style={{ fontSize: "16px", color: "#d9534f", fontWeight: "bold" }}>
          No available times for this date. Please select another day.
        </p>
      )}
    </section>
  );
};

export default TimeOptions;
