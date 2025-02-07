import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const Calendar = ({ onSlotSelect }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios.get("/api/slots").then((response) => setSlots(response.data));
  }, []);

  return (
    <div className="calendar">
      <h2>Available Slots</h2>
      <ul>
        {slots.map((slot) => (
          <li key={slot._id} onClick={() => onSlotSelect(slot)}>
            {new Date(slot.startTime).toLocaleString()} -{" "}
            {new Date(slot.endTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
