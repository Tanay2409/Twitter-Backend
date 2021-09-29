const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const cookies = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const oneDay = 1000 * 60 * 60 * 24;

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(
  session({
    secret: uuidv4(),
    resave: false,
    cookie: { maxAge: oneDay },
    saveUninitialized: true,
  })
);
app.use(cookies());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
