import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({ formData, onChange, fullyBookedDates }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    if (!formData.selectedDate) {
      onChange("selectedDate", new Date().toLocaleDateString());
    } else {
      setSelectedDate(new Date(formData.selectedDate));
    }
  }, [formData.selectedDate, onChange]);

  const CustomButtonInput = forwardRef(
    ({ value, onClick, className }, ref) => {
      const today = new Date().toLocaleDateString();
      const isToday = new Date(value).toLocaleDateString() === today;
      return (
        <button
          type="button"
          className={className}
          onClick={onClick}
          ref={ref}
        >
          {isToday ? "Today" : value}
        </button>
      );
    }
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString();
    onChange("selectedDate", formattedDate);
  };
  const isDateDisabled = (date) => {
    return fullyBookedDates.includes(date.toLocaleDateString());
  };
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      customInput={<CustomButtonInput className="date-picker-btn" />}
      minDate={new Date()}
      filterDate={(date) => !isDateDisabled(date)}
      aria-label="Select the date you want a reservation for"
    />
  );
};

export default DateSelector;
