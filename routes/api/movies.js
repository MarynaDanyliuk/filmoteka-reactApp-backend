const express = require("express");

const movies = require("../../models/movies");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // return res.status(200).json({
  //   title: "Express Testing",
  //   message: "The app is working properly!",
  // });
  const result = await movies.listMovies();
  return res.status(200).json(result);
});

module.exports = router;

// title: "Express Testing",
// message: "The app is working properly!",

// router.get("/:movieId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.delete("/:movieId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.put("/:movieId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });
