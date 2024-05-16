const User = require("../models/User");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { JWT_PRIVATE_KEY } = require("../config");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};

const generateTokenForUser = async (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      emaiL: user.email,
      role: user.role,
    },
    JWT_PRIVATE_KEY
  );
};

const loginUser = async (user) => {
  const { email, password } = user;

  const target = await getUserByEmail(email);

  // 2. if target don't exists, return error
  if (!target) {
    throw new Error("Invalid email or password");
  }

  // 3. check if password match or not
  const isPasswordMatch = bcrypt.compareSync(password, target.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  // 4. generate JWT token
  const token = generateTokenForUser(target);
  // 5. return back the user data
  return {
    _id: target._id,
    name: target.name,
    emaiL: target.email,
    role: target.role,
    token: token,
  };
};

const signUpUser = async (user) => {
  const { name, email, password } = user;
  const email_exists = await getUserByEmail(email);
  if (email_exists) throw new Error("Email already exists");

  // 2. create the new user
  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10), // hash password
  });

  // 3. save the data
  await newUser.save();
  const token = generateTokenForUser(newUser);

  // 4. return the user data
  return {
    _id: newUser._id,
    name: newUser.name,
    emaiL: newUser.email,
    role: newUser.role,
    token: token,
  };
};

module.exports = {
  getUserByEmail,
  loginUser,
  signUpUser,
};
