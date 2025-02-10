import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [slots, setSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");

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

  const bookAppointment = async (slotId) => {
    if (!userName || !contact) {
      alert("Please enter your name and contact information.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/appointments", {
        userName,
        contact,
        slotId,
      });
      fetchSlots();
      fetchAppointments();
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Appointment Booking System</h1>

      {/* Input fields for user name and contact */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Information</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Your Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Available Slots */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Available Slots</h2>
        <div className="grid grid-cols-2 gap-4">
          {slots.map((slot) => (
            <div key={slot._id} className="p-4 border rounded-lg shadow">
              <p>
                {new Date(slot.startTime).toLocaleString()} -{" "}
                {new Date(slot.endTime).toLocaleString()}
              </p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => bookAppointment(slot._id)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Your Appointments */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Appointments</h2>
        <div className="grid grid-cols-2 gap-4">
          {appointments.map((appt) => (
            <div key={appt._id} className="p-4 border rounded-lg shadow">
              <p>Name: {appt.userName}</p>
              <p>Contact: {appt.contact}</p>
              <p>
                Time: {new Date(appt.slot.startTime).toLocaleString()} -{" "}
                {new Date(appt.slot.endTime).toLocaleString()}
              </p>
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => cancelAppointment(appt._id)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
