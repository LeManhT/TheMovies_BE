const express = require("express");
const router = express();
const path = require("path");
const { checkLogin } = require("../middleware/auth");

router.post("/api/upload", checkLogin,handleUpload);
