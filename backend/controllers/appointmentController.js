const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");

exports.bookAppointment = async (req, res) => {
  const { userName, contact, slotId } = req.body;

  // Input validation
  if (!userName || !contact || !slotId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const slot = await Slot.findById(slotId);
    if (!slot || slot.isBooked) {
      return res.status(400).json({ message: "Slot not available" });
    }

    const appointment = new Appointment({ userName, contact, slot: slotId });
    await appointment.save();

    slot.isBooked = true;
    await slot.save();

    res.status(201).json(appointment);
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("slot");
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndDelete(id).populate(
      "slot"
    );
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const slot = await Slot.findById(appointment.slot._id);
    slot.isBooked = false;
    await slot.save();

    res.json({ message: "Appointment canceled" });
  } catch (err) {
    console.error("Error canceling appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
};
