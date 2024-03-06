const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const { ctrlWrapper, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

const register = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    email: user.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const result = await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: result.email,
    },
  });
};

const logout = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const result = await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: result.email,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};

// const { nanoid } = require("nanoid");
// const crypto = require("crypto");

//   sendEmail,
//   removeFromCloud,

//   try {
//     const { id } = jwt.verify(token, SECRET_KEY);
//     console.log(id);
//   } catch (error) {
//     console.log(error.message);
//   }

//   verifyEmail: ctrlWrapper(verifyEmail),
//   resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
//   getCurrent: ctrlWrapper(getCurrent),
//   updateAvatar: ctrlWrapper(updateAvatar),

//   const verifyEmail = {
//     to: email,
//     subject: "Verify email",
//     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
//   };

//   await sendEmail(verifyEmail);

//   user = await refreshUserToken(user._id);
//   const { accessToken, refreshToken } = user;
//   const verificationToken = await sendVerificationEmail(user, lang);
// _______________________________________
//   if (!passwordCompare) {
//     throw HttpError(401, "Email or password invalid");

//     const payload = {
//       id: user._id,
//     };

//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

//     res.json({
//       token,
//     });
//   }
//   const hashPassword = await bcrypt.hash(password, 10);
//   const verificationToken = nanoid();

//   user = await User.create({
//     ...req.body,
//     password: hashPassword,
//     // verificationToken,
//   });

//   const verifyEmail = {
//     to: email,
//     subject: "Verify email",
//     html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
//   };

//   await sendEmail(verifyEmail);

//   user = await refreshUserToken(user._id);
//   const { accessToken, refreshToken } = user;
//   const verificationToken = await sendVerificationEmail(user, lang);
//   res.status(201).json({
//     email: user.email,
//     // accessToken,
//     // refreshToken,
//     // token: verificationToken,
//     // email: newUser.email,
//     // name: newUser.name,
//     // user: selectUserInfo(user),
//   });
