import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("/api/appointments")
      .then((response) => setAppointments(response.data));
  }, []);

  const handleCancel = (id) => {
    axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setAppointments(appointments.filter((app) => app._id !== id));
        alert("Appointment canceled");
      })
      .catch(() => alert("Failed to cancel appointment"));
  };

  return (
    <div className="appointments-list">
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map((app) => (
          <li key={app._id}>
            {app.userName} - {new Date(app.slot.startTime).toLocaleString()}
            <button onClick={() => handleCancel(app._id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
