const express = require("express");

const users = require("../../models/user");
const ctrl = require("../../controllers/users");

const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
  // const result = await users.listUsers();
  // return res.status(200).json(result);
});

router.post("/signup", async (req, res, next) => {
  // return res.status(200).json({
  //   title: "Express Testing",
  //   message: "SIGNUP is working properly!",
  // });
  const result = await ctrl.register();
  return res.status(200).json(result);
});

module.exports = router;
