import React from "react";

const TimeSelection = ({ formData, onChange }) => {
  const availableTimes = [
    { time: "5:30 PM", available: true },
    { time: "6:00 PM", available: false},
    { time: "6:30 PM", available: true },
    { time: "7:00 PM", available: true },
    { time: "7:30 PM", available: true },
    { time: "8:00 PM", available: true },
    { time: "8:30 PM", available: true },
    { time: "9:00 PM", available: true },
    { time: "9:30 PM", available: true },
    { time: "10:00 PM", available: true },
    { time: "10:30 PM", available: true },
    { time: "11:00 PM", available: true },
    { time: "11:30 PM", available: true }
  ];

  return (
    <section>
      {availableTimes.map(({ time, available }) => (
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

export default TimeSelection;
