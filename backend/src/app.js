const express = require("express");
const cors = require("cors");
const clientRoutes = require("./routes/client.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/clients", clientRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;