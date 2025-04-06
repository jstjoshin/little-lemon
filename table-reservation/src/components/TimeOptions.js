import React from "react";

const TimeOptions = ({ formData, onChange, availableTimes, timesLoading, timesErrorMessage }) => {
  const filteredTimes = availableTimes.filter(({ available }) => available);

  return (
    <section className="time-options">
      {timesLoading && (
        <p style={{ fontSize: "16px", color: "#337ab7", fontWeight: "bold" }}>
          Checking for available times...
        </p>
      )}
      {timesErrorMessage && !timesLoading && (
        <p style={{ fontSize: "16px", color: "#d9534f", fontWeight: "bold" }}>
          Sorry we are unable to provide available times right now, please try again later.
        </p>
      )}
      {!timesErrorMessage && !timesLoading && filteredTimes.length === 0 && (
        <p style={{ fontSize: "16px", color: "#d9534f", fontWeight: "bold" }}>
          Sorry no times are available for {formData.selectedDate}, please select another day.
        </p>
      )}

      {!timesLoading && !timesErrorMessage && filteredTimes.length > 0 && (
        filteredTimes.map(({ rawTime, displayTime, available }) => {
          const [time, period] = displayTime.split(" ");
          return (
            <button
              key={rawTime}
              type="button"
              onClick={() => {
                onChange("selectedTimeRaw", rawTime);
                onChange("selectedTimeDisplay", displayTime);
              }}
              disabled={!available}
              className={`time-button ${formData.selectedTimeDisplay === displayTime ? "selected" : ""}`}
            >
              {time} <span>{period}</span>
            </button>
          );
        })
      )}
    </section>
  );
};

export default TimeOptions;
