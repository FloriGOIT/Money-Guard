const express = require("express");
const router = express.Router();

const animals = [{ id: 12345, name: "cat", carnivor: true, details:"friendly with humans"}]

router.get("/", (req, res) => {
        res.send(`<h1>${animals[0].name}</h1>`)
})
module.exports = router