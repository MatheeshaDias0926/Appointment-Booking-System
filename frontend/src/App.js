import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "./components/Calendar";
import BookingForm from "./components/BookingForm";
import AppointmentsList from "./components/AppointmentsList";
import "./styles.css";

const App = () => {
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchSlots();
    fetchAppointments();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/slots");
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments"
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const bookAppointment = async (bookingData) => {
    try {
      await axios.post("http://localhost:5000/api/appointments", bookingData);
      fetchSlots();
      fetchAppointments();
      setShowPopup(false);
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  // ✅ Define cancel function
  const cancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/appointments/${appointmentId}`
      );
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  return (
    <div className="app">
      <br />
      <h1 className="center-title">Appointment Booking System</h1>
      <br />
      <div className="container">
        <div className="left-panel">
          <Calendar
            slots={slots}
            onSlotSelect={(slot) => {
              setSelectedSlot(slot);
              setShowPopup(true);
            }}
          />
        </div>
        <div className="right-panel">
          {/* ✅ Pass cancel function to AppointmentsList */}
          <AppointmentsList
            appointments={appointments}
            onCancelAppointment={cancelAppointment}
          />
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              ✖
            </button>
            <BookingForm
              selectedSlot={selectedSlot}
              onBookAppointment={bookAppointment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
