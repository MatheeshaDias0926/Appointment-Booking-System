import React, { useState } from "react";

const BookingForm = ({ selectedSlot, onBookAppointment }) => {
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");

  const validatePhoneNumber = (number) => {
    const regex = /^\+94\d{9}$/;
    return regex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !contact) {
      alert("Please enter your name and contact information.");
      return;
    }
    if (!validatePhoneNumber(contact)) {
      alert("Invalid phone number! Use format: +94XXXXXXXXX");
      return;
    }
    onBookAppointment({ userName, contact, slotId: selectedSlot._id });
  };

  return (
    <div className="booking-form">
      <h2>Book Appointment</h2>
      <p>
        <strong>Date:</strong> {new Date(selectedSlot.startTime).toDateString()}
      </p>
      <p>
        <strong>Time:</strong>{" "}
        {new Date(selectedSlot.startTime).toLocaleTimeString()}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
