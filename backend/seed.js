const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");
const Slot = require("./models/Slot");

const seedSlots = async () => {
  await connectDB(); // Connect to MongoDB

  try {
    // Clear existing slots
    await Slot.deleteMany();
    console.log("Old slots removed...");

    const slots = [
      {
        startTime: new Date("2024-10-10T09:00:00"),
        endTime: new Date("2024-10-10T09:30:00"),
        isBooked: false,
      },
      {
        startTime: new Date("2024-10-10T10:00:00"),
        endTime: new Date("2024-10-10T10:30:00"),
        isBooked: false,
      },
      {
        startTime: new Date("2024-10-10T11:00:00"),
        endTime: new Date("2024-10-10T11:30:00"),
        isBooked: false,
      },
      {
        startTime: new Date("2024-10-10T14:00:00"),
        endTime: new Date("2024-10-10T14:30:00"),
        isBooked: false,
      },
      {
        startTime: new Date("2024-10-10T15:00:00"),
        endTime: new Date("2024-10-10T15:30:00"),
        isBooked: false,
      },
      {
        startTime: new Date("2024-10-10T16:00:00"),
        endTime: new Date("2024-10-10T16:30:00"),
        isBooked: false,
      },
      {
        startTime: new Date("2024-10-10T17:00:00"),
        endTime: new Date("2024-10-10T17:30:00"),
        isBooked: false,
      },
    ];

    await Slot.insertMany(slots);
    console.log("✅ Database seeded with appointment slots!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seedSlots();
