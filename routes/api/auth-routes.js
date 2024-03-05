const express = require("express");

// const users = require("../../models/user");
const ctrl = require("../../controllers/users");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
  // const result = await users.listUsers();
  // return res.status(200).json(result);
});

const validateLogin = (req, res, next) => {
  const { error } = schemas.loginSchema.validate(req.body, {
    abortEarly: false,
  });

  if (!Object.keys(req.body).length) throw HttpError(400, "missing fields");

  if (error) {
    const missingField = error.details[0].context.key;
    return res
      .status(400)
      .json({ message: `missing required ${missingField} field` });
  }
  next();
};

// signup
router.post("/signup", validateBody(schemas.registerSchema), ctrl.register);

// login
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// logout
router.post("/logout", validateBody(schemas.logoutSchema), ctrl.logout);

module.exports = router;

// router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
// router.post("/signup", async (req, res, next) => {
//   // return res.status(200).json({
//   //   title: "Express Testing",
//   //   message: "SIGNUP is working properly!",
//   // });
//   const result = await ctrl.register();
//   return res.status(200).json(result);
// });
