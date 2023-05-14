const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const { JWT_PASSWORD } = process.env;

// sign up
exports.getUserSignUp = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/signUp/signUp.html"));
};

exports.handleCreateUser = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const passwordConfirm = await bcrypt.hash(req.body.passwordConfirm, 10);
    const checkUsername = await userModel.findOne({
      username: req.body.username,
    });

    if (checkUsername) {
      res.status(400).json({
        message: "username has already existed. Please another username ! ",
      });
      return;
    }
    if (req.body.password !== req.body.passwordConfirm) {
      res.status(400).json({
        message:
          "Your password and confirm password is incompatible. Please check and try again !",
      });
      return;
    }
    const data = await userModel.create({
      username: req.body.username,
      password,
      passwordConfirm,
      email: req.body.email,
    });
    res.status(200).json({ message: "success", data });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

// login
exports.getUserLogin = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../views/login/login.html"));
  } catch (error) {
    console.log(error);
  }
};

exports.handleLogin = async (req, res) => {
  try {
    const checkUser = await userModel.findOne({
      username: req.body.username,
    });
    if (!checkUser) {
      res.status(400).json({ message: "Wrong username. Please try again !" });
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );
    if (!checkPassword) {
      res.status(400).json({ message: "Wrong password. Please try again !" });
    }
    delete checkUser._doc.password;
    delete checkUser._doc.passwordConfirm;
    const token = jwt.sign({ checkUser }, JWT_PASSWORD, {
      expiresIn: "2 days",
    });
    res.cookie("themovie-user", token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
    });
    res.status(200).json({ message: "Login success !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error !" });
  }
};
