const express = require("express");
const router = express.Router();
const slotController = require("../controllers/slotController");
const appointmentController = require("../controllers/appointmentController");

router.get("/slots", slotController.getSlots);
router.post("/appointments", appointmentController.bookAppointment);
router.get("/appointments", appointmentController.getAppointments);
router.delete("/appointments/:id", appointmentController.cancelAppointment);
router.post("/admin/slots", slotController.createSlots);
router.get("/admin/slots", slotController.getAllSlots);
router.delete("/admin/slots/:id", slotController.deleteSlot);

module.exports = router;
