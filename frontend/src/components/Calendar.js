import React from "react";

const Calendar = ({ slots, onSlotSelect }) => {
  return (
    <div className="calendar">
      <h2>Available Time Slots</h2>
      <div className="slots-list">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className="slot"
            onClick={() => onSlotSelect(slot)}
          >
            <p className="date">{new Date(slot.startTime).toDateString()}</p>
            <p className="time">
              {new Date(slot.startTime).toLocaleTimeString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
