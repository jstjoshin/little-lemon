import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({ formData, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    if (!formData.selectedDate) {
      onChange("selectedDate", new Date().toLocaleDateString());
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
  
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      customInput={<CustomButtonInput className="date-picker-btn" />}
    />
  );
};

export default DateSelector;
