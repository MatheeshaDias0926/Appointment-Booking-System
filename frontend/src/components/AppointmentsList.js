import React from "react";
import Appointment from "./Appointment";
import { motion } from "framer-motion"; // Animation library

const AppointmentsList = ({ appointments = [], onCancelAppointment }) => {
  return (
    <motion.div
      className="appointments-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="appointments-title">Your Appointments</h2>

      {appointments.length === 0 ? (
        <p className="no-appointments">No appointments booked yet.</p>
      ) : (
        appointments.map((appt) => (
          <motion.div
            key={appt._id}
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Appointment
              appointment={appt}
              onCancelAppointment={() => onCancelAppointment(appt._id)} // ✅ Ensure function is correctly passed
            />
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default AppointmentsList;
