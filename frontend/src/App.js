import React, { useState } from "react";
import Calendar from "./components/Calendar";
import BookingForm from "./components/BookingForm";
import AppointmentsList from "./components/AppointmentsList";
import "./styles.css";

const App = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="app">
      <h1>Appointment Booking System</h1>
      <Calendar onSlotSelect={setSelectedSlot} />
      {selectedSlot && <BookingForm slot={selectedSlot} />}
      <AppointmentsList />
    </div>
  );
};

export default App;
