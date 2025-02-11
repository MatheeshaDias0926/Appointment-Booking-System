const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");

exports.bookAppointment = async (req, res) => {
  const { userName, contact, slotId } = req.body;

  if (!userName || !contact || !slotId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const slot = await Slot.findByPk(slotId);
    if (!slot || slot.isBooked) {
      return res.status(400).json({ message: "Slot not available" });
    }

    const appointment = await Appointment.create({ userName, contact, slotId });

    await slot.update({ isBooked: true });

    res.status(201).json(appointment);
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ include: Slot });
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const slot = await Slot.findByPk(appointment.slotId);
    await slot.update({ isBooked: false });

    await appointment.destroy();

    res.json({ message: "Appointment canceled" });
  } catch (err) {
    console.error("Error canceling appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
};
