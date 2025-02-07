import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const BookingForm = ({ slot }) => {
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/appointments", { userName, contact, slotId: slot._id })
      .then(() => alert("Appointment booked!"))
      .catch(() => alert("Failed to book appointment"));
  };

  return (
    <div className="booking-form">
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingForm;
