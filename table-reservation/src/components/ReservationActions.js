import React, { useContext, useEffect, useRef, useState } from "react";
import { ModalContext } from "../App";
import { useNavigate } from "react-router-dom";
import { ReactComponent as IconAddCal } from '../images/icon-add-cal.svg';

const ReservationActions = ({ formData }) => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);
  const { firstName, lastName, selectedDate, selectedTimeDisplay } = formData;
  const eventTitle = `Reservation for ${firstName} ${lastName}`;
  const eventLocation = "Little Lemon Restaurant";
  const eventDetails = "Your reservation at Little Lemon resturaunt.";
  const { showModal, hideModal } = useContext(ModalContext);
  const navigate = useNavigate();

  // Convert to ISO format
  const eventStart = new Date(`${selectedDate} ${selectedTimeDisplay}`).toISOString().replace(/-|:|\.\d+/g, "");
  const eventEnd = new Date(new Date(`${selectedDate} ${selectedTimeDisplay}`).getTime() + 60 * 60 * 1000)
    .toISOString()
    .replace(/-|:|\.\d+/g, "");

  // Google Calendar Link
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${encodeURIComponent(eventStart)}/${encodeURIComponent(eventEnd)}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;

  // iCalendar .ics File
  const generateICSFile = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventTitle}
DTSTART:${eventStart}
DTEND:${eventEnd}
LOCATION:${eventLocation}
DESCRIPTION:${eventDetails}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "reservation.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCancelReservation = () => {
    const stored = JSON.parse(localStorage.getItem("reservedTimes"));
    const date = formData.selectedDate;
    const time = formData.selectedTimeRaw;
    if (stored[date]) {
      stored[date] = stored[date].filter(t => t !== time);
      if (stored[date].length === 0) delete stored[date];
      localStorage.setItem("reservedTimes", JSON.stringify(stored));
    }
    hideModal();
    showModal(
      <SuccessModal
        onHome={() => {
          hideModal();
          navigate("/");
        }}
        onNew={() => {
          hideModal();
          navigate("/booking");
        }}
      />,
      true
    );
  };
  const confirmCancel = () => {
    showModal(
      <ConfirmationModal
        onConfirm={handleCancelReservation}
        onCancel={hideModal}
      />
    );
  };
  const ConfirmationModal = ({ onConfirm, onCancel }) => (
    <>
      <h5>Please confirm your choice below</h5>
      <span>
        <button onClick={onConfirm}>Cancel Reservation</button>
        <button onClick={onCancel}>Keep Reservation</button>
      </span>
    </>
  );
  const SuccessModal = ({ onHome, onNew }) => (
    <>
      <h5>Your reservation has been canceled</h5>
      <span>
        <button onClick={onNew}>New Reservation</button>
        <button onClick={onHome}>Home</button>
      </span>
    </>
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <span className="container-btn" ref={dropdownRef}>
        <button
          onClick={() => setShowOptions(!showOptions)}
          aria-expanded={showOptions}
          aria-controls="calendar-options"
          className={`btn-add-cal ${showOptions ? "selected" : ""}`}
        >
          <IconAddCal className="icon-add-cal" />
          Add to Calendar
        </button>
        {showOptions && (
            <div id="calendar-options">
              <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer" onClick={() => setShowOptions(!showOptions)}>
                <button>Google Calendar</button>
              </a>
              <button
                onClick={() => {
                  generateICSFile();
                  setShowOptions(!showOptions);
                }}
              >
                Apple Calendar
              </button>
            </div>
          )}
      </span>
      <span className="container-btn">
        <button
          onClick={confirmCancel}
        >
          Cancel Reservation
        </button>
      </span>
    </>
  );
};

export default ReservationActions;
