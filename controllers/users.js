const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {
  ctrlWrapper,
  HttpError,
  //   sendEmail,
  //   removeFromCloud,
} = require("../helpers");

// const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY, FRONTEND_URL } = process.env;
// const verificationEmail = require("../templates/verificationEmail");

const { User } = require("../models/user");

const register = async (req, res) => {
  //   const { body } = req;
  // const { email, password, lang } = body;
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationCode = nanoid();

  user = await User.create({
    ...req.body,
    password: hashPassword,
    verificationCode,
  });

  //   const verifyEmail = {
  //     to: email,
  //     subject: "Verify email",
  //     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  //   };

  //   await sendEmail(verifyEmail);

  //   user = await refreshUserToken(user._id);
  //   const { accessToken, refreshToken } = user;
  //   const verificationToken = await sendVerificationEmail(user, lang);
  res.status(201).json({
    email: user.email,
    name: user.name,
    // accessToken,
    // refreshToken,
    // verificationToken,
    // email: newUser.email,
    // name: newUser.name,
    // user: selectUserInfo(user),
  });
};

module.exports = {
  register: ctrlWrapper(register),
  //   verifyEmail: ctrlWrapper(verifyEmail),
  //   resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  //   login: ctrlWrapper(login),
  //   getCurrent: ctrlWrapper(getCurrent),
  //   logout: ctrlWrapper(logout),
  //   updateAvatar: ctrlWrapper(updateAvatar),
};
