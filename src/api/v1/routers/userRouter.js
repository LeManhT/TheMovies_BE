const express = require("express");

const {
  getUserSignUp,
  handleCreateUser,
  handleLogin,
  getUserLogin,
} = require("../controllers/userController");
const router = express();

// sign up
router.get("/api/signUp", getUserSignUp);

router.post("/api/signUp", handleCreateUser);

// login
router.get("/api/login", getUserLogin);

router.post("/api/login", handleLogin);

module.exports = router;
