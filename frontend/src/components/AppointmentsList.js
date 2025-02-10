import React from "react";
import Appointment from "./Appointment";

const AppointmentsList = ({ appointments, onCancelAppointment }) => {
  return (
    <div className="appointments-list">
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        appointments.map((appt) => (
          <Appointment
            key={appt._id}
            appointment={appt}
            onCancelAppointment={onCancelAppointment}
          />
        ))
      )}
    </div>
  );
};

export default AppointmentsList;
