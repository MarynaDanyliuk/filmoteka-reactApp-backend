const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");

const moviesPath = path.join(__dirname, "./movies.json");

const listMovies = async () => {
  const data = await fs.readFile(moviesPath, { encoding: "utf-8" });
  return JSON.parse(data);
};

const getMovieById = async (movieId) => {};

const removeMovie = async (movieId) => {};

const addMovie = async (body) => {};

const updateMovie = async (movieId, body) => {};

module.exports = {
  listMovies,
  // getMovieById,
  // removeMovie,
  // addMovie,
  // updateMovie,
};
