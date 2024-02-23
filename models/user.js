const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const registerJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const User = model("user", userSchema);

const schemas = {
  register: registerJoiSchema,
  login: loginJoiSchema,
};

module.exports = {
  User,
  schemas,
};

// ____________________________________________________
// const fs = require("fs/promises");
// const path = require("path");

// const usersPath = path.join(__dirname, "./movies.json");

// const listUsers = async () => {
//   const data = await fs.readFile(usersPath, { encoding: "utf-8" });
//   return JSON.parse(data);
// };

// const getMovieById = async (movieId) => {};

// const removeMovie = async (movieId) => {};

// const addMovie = async (body) => {};

// const updateMovie = async (movieId, body) => {};

// module.exports = {
//   listUsers,
//   // getMovieById,
//   // removeMovie,
//   // addMovie,
//   // updateMovie,
// };
