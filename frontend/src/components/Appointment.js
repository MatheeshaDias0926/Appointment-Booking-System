import React from "react";

const Appointment = ({ appointment, onCancelAppointment }) => {
  if (!appointment || !appointment.slot) {
    return <p>Appointment details are not available.</p>; // ✅ Prevents errors if appointment or slot is missing
  }

  return (
    <div className="appointment">
      <p>Name: {appointment.userName || "N/A"}</p>
      <p>Contact: {appointment.contact || "N/A"}</p>
      <p>
        Time:{" "}
        {appointment.slot.startTime
          ? new Date(appointment.slot.startTime).toLocaleString()
          : "Not Available"}{" "}
        -{" "}
        {appointment.slot.endTime
          ? new Date(appointment.slot.endTime).toLocaleString()
          : "Not Available"}
      </p>
      <button onClick={() => onCancelAppointment(appointment._id)}>
        Cancel
      </button>
    </div>
  );
};

export default Appointment;
