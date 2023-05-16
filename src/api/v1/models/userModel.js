const { DB_URL } = process.env;
const mongoose = require("mongoose");
mongoose.connect(DB_URL);

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConfirm: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { collection: "userModelLogin" }
);

const userModel = mongoose.model("userModelLogin", userSchema);

module.exports = userModel;
