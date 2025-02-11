import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div>
      <h2>Admin Panel - Manage Appointment Slots</h2>
      <div>
        <label>Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
        />
        <button onClick={addSlots}>Add Slots</button>
      </div>

      <h3>Available Slots</h3>
      <ul>
        {slots.map((slot) => (
          <li key={slot._id}>
            {new Date(slot.startTime).toLocaleString()} -{" "}
            {new Date(slot.endTime).toLocaleString()}{" "}
            <button onClick={() => deleteSlot(slot._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
