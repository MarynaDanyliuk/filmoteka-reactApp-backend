// Import packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/api/users");
const routerMovies = require("./routes/api/movies");

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", usersRouter);
app.use("/api/movies", routerMovies);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
