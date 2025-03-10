const Slot = require("../models/Slot");

exports.getSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ isBooked: false });
    res.json(slots);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Create Available Slots
exports.createSlots = async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    const startHour = 9;
    const endHour = 17;

    const newSlots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      const startTime = new Date(date);
      startTime.setHours(hour, 0, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(hour + 1);

      const existingSlot = await Slot.findOne({ startTime });
      if (!existingSlot) {
        newSlots.push({ startTime, endTime });
      }
    }

    if (newSlots.length > 0) {
      await Slot.insertMany(newSlots);
    }

    res.status(201).json({ message: "Slots added successfully", newSlots });
  } catch (err) {
    console.error("Error adding slots:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Get All Slots (Including Booked Ones)
exports.getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin: Delete a Slot
exports.deleteSlot = async (req, res) => {
  const { id } = req.params;

  try {
    await Slot.findByIdAndDelete(id);
    res.json({ message: "Slot deleted successfully" });
  } catch (err) {
    console.error("Error deleting slot:", err);
    res.status(500).json({ message: "Server error" });
  }
};
