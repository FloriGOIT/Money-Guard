let y = "Backend is runninggg!"

const arrayNumbers = [1, 2, 5, 12, 54, 67];
console.log("🟡 This is my arrayNumbers:",arrayNumbers)
console.log("💌 Cum te numesti?")
console.log("🔰 Je suis a commence de mes etudes. Je peux parler aussi em francais avec toi.")


const express = require("express")
require("dotenv").config();
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const creatError = require("http-errors");
const cors = require("cors");


const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.get("/", (req, res) => {
        res.send(`<h1>${y}</h1>`);
});

app.use((req, res, next) => {
        next(creatError(404))
})


app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.send(`<h1>Error status: ${err.status}</h1>
                <p>Error message: ${err.message}</p>`)
})

const PORT = process.env.PORT
app.listen(PORT);