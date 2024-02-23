const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");

const usersPath = path.join(__dirname, "./movies.json");

const listUsers = async () => {
  const data = await fs.readFile(usersPath, { encoding: "utf-8" });
  return JSON.parse(data);
};

const getMovieById = async (movieId) => {};

const removeMovie = async (movieId) => {};

const addMovie = async (body) => {};

const updateMovie = async (movieId, body) => {};

module.exports = {
  listUsers,
  // getMovieById,
  // removeMovie,
  // addMovie,
  // updateMovie,
};
