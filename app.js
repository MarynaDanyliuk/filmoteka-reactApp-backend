// Import packages
const express = require("express");
const routerMovies = require("./routes/api/movies");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/api/movies", routerMovies);

module.exports = app;
