const express = require("express");
const router = express();
const path = require("path");
const { checkLogin } = require("../middleware/auth");

router.get("/", checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../views/home.html"));
});

module.exports = router;
