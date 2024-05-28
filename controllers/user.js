const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

const generateTokenForUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_PRIVATE_KEY,
    {
      expiresIn: "30d",
    }
  );
};

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  let isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    throw new Error({ msg: "Invalid Credentials", status: 400 });
  }
  const token = generateTokenForUser(user);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

const signUpUser = async (name, email, password) => {
  const emailExist = await getUserByEmail(email);
  if (emailExist) {
    throw new Error("Email already exist");
  }
  //   let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password: hash,
  });
  await newUser.save();

  const token = generateTokenForUser(newUser);

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token,
  };
};

module.exports = {
  getUserByEmail,
  loginUser,
  signUpUser,
};
