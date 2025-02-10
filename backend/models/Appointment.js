const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    contact: { type: String, required: true },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
