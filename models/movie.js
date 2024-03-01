const { Schema, model } = require("mongoose");
const Joi = require("joi");

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiAddSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favorite: Joi.boolean(),
});

const Movie = model("movie", movieSchema);

module.exports = {
  Movie,
  schemas: {
    add: joiAddSchema,
  },
};

// _____________________________________________

// const fs = require("fs/promises");
// const path = require("path");

// const moviesPath = path.join(__dirname, "./movies.json");

// const listMovies = async () => {
//   const data = await fs.readFile(moviesPath, { encoding: "utf-8" });
//   return JSON.parse(data);
// };

// const getMovieById = async (movieId) => {};

// const removeMovie = async (movieId) => {};

// const addMovie = async (body) => {};

// const updateMovie = async (movieId, body) => {};

// module.exports = {
//   listMovies,
//   // getMovieById,
//   // removeMovie,
//   // addMovie,
//   // updateMovie,
// };