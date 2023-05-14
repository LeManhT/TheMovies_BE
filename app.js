require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser')
const userRouter = require("./src/api/v1/routers/userRouter");
const indexRouter = require("./src/api/v1/routers/indexRouter");

const app = express();
const port = process.env.PORT;

app.use(cors()); // cho goi khac cổng
app.use(morgan("combined"));

app.use("/views", express.static(path.join(__dirname, "./src/api/v1/views")));

//middleware
app.use(express.urlencoded({ extended: false })); // dùng nhận data từ request body
app.use(express.json()); // dùng nhận data từ request body
app.use(cookieParser()); // dùng nhận cookie

app.use("/user", userRouter);
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
