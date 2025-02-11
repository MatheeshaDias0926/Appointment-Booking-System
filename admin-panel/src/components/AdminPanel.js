import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion"; // Animation library
import "./styles.css";

const AdminPanel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/slots");
      setSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  const addSlots = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/slots", {
        date: selectedDate,
      });
      fetchSlots();
    } catch (error) {
      console.error("Error adding slots:", error);
    }
  };

  const deleteSlot = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/slots/${id}`);
      fetchSlots();
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  return (
    <motion.div
      className="admin-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="admin-title">Admin Panel - Manage Appointment Slots</h2>

      <motion.div
        className="date-picker-container"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <label className="date-label">Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="date-picker"
        />
        <button className="add-slot-btn" onClick={addSlots}>
          Add Slots
        </button>
      </motion.div>

      <h3 className="available-slots-title">Available Slots</h3>
      {slots.length === 0 ? (
        <p className="no-slots">No slots available.</p>
      ) : (
        <ul className="slots-list">
          {slots.map((slot) => (
            <motion.li
              key={slot._id}
              className="slot-item"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {new Date(slot.startTime).toLocaleString()} -{" "}
              {new Date(slot.endTime).toLocaleString()}{" "}
              <button
                className="delete-slot-btn"
                onClick={() => deleteSlot(slot._id)}
              >
                Delete
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default AdminPanel;
