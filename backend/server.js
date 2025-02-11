const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB, sequelize } = require("./config/db");
const apiRoutes = require("./routes/api");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

// Sync database
sequelize
  .sync({ alter: true }) // Set to { force: true } to drop and recreate tables
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("Database sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
