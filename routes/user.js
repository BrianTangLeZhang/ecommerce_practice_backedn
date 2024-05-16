const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  loginUser,
  signUpUser,
} = require("../controllers/user");

router.post("/login", async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const loginedUser = await loginUser(user);
    res.status(200).send(loginedUser);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const newUser = await signUpUser(user);
    res.status(200).send(newUser);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
   
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    
  } catch (e) {
    res.status(400).send({ msg: e.message });
  }
});

module.exports = router;
