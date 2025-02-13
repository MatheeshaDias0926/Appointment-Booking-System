const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Slot = sequelize.define("Slot", {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isBooked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Slot;
