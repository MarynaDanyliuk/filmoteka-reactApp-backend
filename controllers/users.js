const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {
  ctrlWrapper,
  HttpError,
  removeFromCloud,
  sendEmail,
} = require("../helpers");

// const verificationEmail = require("../templates/verificationEmail");

const { User, constants } = require("../models/user");

const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, FRONTEND_URL } = process.env;

const register = async (req, res) => {
  const { body } = req;
  // const { email, password, lang } = body;
  const { email, password } = body;
  let user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    ...body,
    password: hashPassword,
  });

  user = await refreshUserToken(user._id);
  const { accessToken, refreshToken } = user;
  //   const verificationToken = await sendVerificationEmail(user, lang);
  res.status(201).json({
    accessToken,
    refreshToken,
    // verificationToken,
    user: selectUserInfo(user),
  });
};
