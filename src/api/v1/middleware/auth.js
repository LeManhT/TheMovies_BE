const jwt = require("jsonwebtoken");
const {JWT_PASSWORD} = process.env;

module.exports.checkLogin = async (req, res, next) => {
  const userCookie = await req.cookies["themovie-user"];
  if (!userCookie) {
    return res.redirect("/user/api/login");
  }
  try {
    const data = await jwt.verify(userCookie, JWT_PASSWORD);
    if (!data) {
      return res.redirect("/user/api/login");
    }
    req.user = data.checkUser;
    next();
  } catch (error) {
    console.log(error);
    return res.redirect("/user/api/login");
  }
};

exports.checkAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") return res.redirect("/user/api/login");
};
