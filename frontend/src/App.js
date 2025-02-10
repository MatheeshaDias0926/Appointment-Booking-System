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
      setSelectedSlot(null); // Reset selected slot after booking
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      fetchSlots();
      fetchAppointments();
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <div className="app">
      <h1>Appointment Booking System</h1>
      <div className="container">
        <Calendar slots={slots} onSlotSelect={setSelectedSlot} />
        {selectedSlot && (
          <BookingForm
            selectedSlot={selectedSlot}
            onBookAppointment={bookAppointment}
          />
        )}
        <AppointmentsList
          appointments={appointments}
          onCancelAppointment={cancelAppointment}
        />
      </div>
    </div>
  );
};

export default App;
