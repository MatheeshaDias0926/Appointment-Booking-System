const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isBooked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Slot", slotSchema);
