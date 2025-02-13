const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Slot = require("./Slot");

const Appointment = sequelize.define("Appointment", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Appointment.belongsTo(Slot);
Slot.hasMany(Appointment);

module.exports = Appointment;
