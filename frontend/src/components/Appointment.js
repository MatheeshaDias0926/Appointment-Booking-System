import React from "react";

const Appointment = ({ appointment, onCancelAppointment }) => {
  return (
    <div className="appointment">
      <p>Name: {appointment.userName}</p>
      <p>Contact: {appointment.contact}</p>
      <p>
        Time: {new Date(appointment.slot.startTime).toLocaleString()} -{" "}
        {new Date(appointment.slot.endTime).toLocaleString()}
      </p>
      <button onClick={() => onCancelAppointment(appointment._id)}>
        Cancel
      </button>
    </div>
  );
};

export default Appointment;
