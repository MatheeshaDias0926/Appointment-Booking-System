const Slot = require("../models/Slot");

exports.getSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ isBooked: false });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
