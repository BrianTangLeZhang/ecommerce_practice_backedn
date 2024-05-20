const User = require("../models/User");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { JWT_PRIVATE_KEY } = require("../config");

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user
};

const generateTokenForUser = async (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_PRIVATE_KEY
  );
};

const loginUser = async (email,password) => {
  const user = await getUserByEmail(email);

  // 2. if user don't exists, return error
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 3. check if password match or not
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  // 4. generate JWT token
  const token = generateTokenForUser(user);
  // 5. return back the user data
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
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
