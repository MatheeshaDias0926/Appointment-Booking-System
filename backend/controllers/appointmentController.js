const { Appointment, Slot } = require("../models");
exports.bookAppointment = async (req, res) => {
  const { userName, contact, slotId } = req.body;

  if (!userName || !contact || !slotId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const transaction = await sequelize.transaction();

  try {
    const slot = await Slot.findByPk(slotId, { transaction });

    if (!slot || slot.isBooked) {
      await transaction.rollback();
      return res.status(400).json({ message: "Slot not available" });
    }

    const appointment = await Appointment.create(
      {
        userName,
        contact,
        SlotId: slotId,
      },
      { transaction }
    );

    await Slot.update(
      { isBooked: true },
      { where: { id: slotId }, transaction }
    );

    await transaction.commit();
    res.status(201).json(appointment);
  } catch (err) {
    await transaction.rollback();
    console.error("Error booking appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [{ model: Slot }],
    });
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;
  const transaction = await sequelize.transaction();

  try {
    const appointment = await Appointment.findByPk(id, {
      include: [Slot],
      transaction,
    });

    if (!appointment) {
      await transaction.rollback();
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.destroy({
      where: { id },
      transaction,
    });

    await Slot.update(
      { isBooked: false },
      { where: { id: appointment.Slot.id }, transaction }
    );

    await transaction.commit();
    res.json({ message: "Appointment canceled" });
  } catch (err) {
    await transaction.rollback();
    console.error("Error canceling appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
};
