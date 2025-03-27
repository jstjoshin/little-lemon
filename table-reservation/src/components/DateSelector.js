import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import iconCalSelect from '../images/icon-cal-select.svg';

const DateSelector = ({ formData, onChange, fullyBookedDates, iconDropdown }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
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
          onClick={() => setIsOpen(!isOpen)}
          ref={ref}
          style={{
            backgroundColor: 'var(--secondary-grey)',
            backgroundImage: `
              url(${iconCalSelect}),
              url(${iconDropdown})
            `,
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundPosition: '1rem center, right 1rem center',
            lineHeight: '1.4375rem',
          }}
        >
          {isToday ? "Today" : value}
        </button>
      );
    }
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
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
      customInput={<CustomButtonInput className="date-selector" />}
      minDate={new Date()}
      filterDate={(date) => !isDateDisabled(date)}
      open={isOpen}
      onClickOutside={() => setIsOpen(false)}
      aria-label="Select the date you want a reservation for"
    />
  );
};

export default DateSelector;
