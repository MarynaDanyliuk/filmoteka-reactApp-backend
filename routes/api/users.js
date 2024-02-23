const express = require("express");

const users = require("../../models/users");

const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
  //   const result = await movies.listMovies();
  //   return res.status(200).json(result);
});

module.exports = router;
