import React, { useState } from "react";

const ReservationActions = ({ navigate, formData }) => {
  const { firstName, lastName, selectedDate, selectedTimeDisplay } = formData;
  const [showOptions, setShowOptions] = useState(false);
  const eventTitle = `Reservation for ${firstName} ${lastName}`;
  const eventLocation = "Little Lemon Restaurant";
  const eventDetails = "Your reservation at Little Lemon resturaunt.";

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

  return (
    <>
        <button onClick={() => navigate("/booking")}>Update Reservation</button>
        <button
          onClick={() => setShowOptions(!showOptions)}
          aria-expanded={showOptions}
          aria-controls="calendar-options"
        >
          Add to Calendar
        </button>

        {showOptions && (
          <div id="calendar-options">
            <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
              <button>Google Calendar</button>
            </a>
            <button onClick={generateICSFile}>
              Apple Calendar
            </button>
          </div>
        )}
    </>
  );
};

export default ReservationActions;
