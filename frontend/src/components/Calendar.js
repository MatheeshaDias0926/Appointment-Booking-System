import React from "react";

const Calendar = ({ slots, onSlotSelect }) => {
  return (
    <div className="calendar">
      <h2>Available Time Slots</h2>
      <div className="slots-grid">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className="slot"
            onClick={() => onSlotSelect(slot)}
          >
            <p>{new Date(slot.startTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
