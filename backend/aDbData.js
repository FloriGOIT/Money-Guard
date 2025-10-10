const express = require("express");
require("dotenv").config();
const createError = require("http-errors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
const animalsRouter = require("./animalRouter.js");
app.use("/animals", animalsRouter);

// Catch 404 after all routes
app.use((req, res, next) => {
  next(createError(404));
});


// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    status: err.status || 500,
    message:err.message
  })
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT} successfully.`);
});
