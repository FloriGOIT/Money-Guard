const express = require("express");
require("dotenv").config();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const cors = require("cors");
const cardRouter = require("../backend/cardRouter.js");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Connected to Mongoose"))
  .catch(() => console.log("❗ Failed to connect to Mongoose."));

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use("/Money-Guard", cardRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(`<h1>Error status: ${err.status}</h1>
                <p>Error message: ${err.message}</p>`);
});

const PORT = process.env.PORT;
app.listen(PORT, (req, res, dev) => {
  console.log("HELLO port 5000!");
});
