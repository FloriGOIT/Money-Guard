
const express = require("express");
require("dotenv").config();
const createError = require("http-errors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const animalRoute = require("./animalFsRouter.js");
app.use("/animals", animalRoute);

app.use((req, res, next) => {
        next(createError(404))
})
app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send({
                status: err.status,
                message:err.message
        })
})
const PORT = process.env.PORT;
app.listen(PORT, (req, res, next) => {
  console.log(`Service available on port: ${PORT}`);
});
