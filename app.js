// Import packages
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const routerUsers = require("./routes/api/auth-routes");
const routerMovies = require("./routes/api/movies-routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// Middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", routerUsers);
app.use("/api/movies", routerMovies);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
