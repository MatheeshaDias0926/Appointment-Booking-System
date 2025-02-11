const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Slot = require("./Slot");

const Appointment = sequelize.define("Appointment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slotId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Slot,
      key: "id",
    },
  },
});

Appointment.belongsTo(Slot, { foreignKey: "slotId", onDelete: "CASCADE" });

module.exports = Appointment;
