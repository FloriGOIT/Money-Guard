const {nanoid} = require ("nanoid")
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//const path = require("path");

const dataForTest = [
  { "id": "1", "animal": "cat", "carnivor": true, "preferes": "mice" },
  { "id": "2", "animal": "dog", "carnivor": true, "preferes": "pig" },
  { "id": "3", "animal": "bee", "carnivor": false, "preferes": "pollen" },
];

const PORT = 5000;
const app = express();

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => { res.status(200).send("Hello amaizing world! 🌍") })

app.get("/animals", (_, res) => { res.status(200).json(dataForTest) })
app.post("/animals", (req, res) => {
        const animal = { id: nanoid(), ...req.body };
        dataForTest.push(animal);
        res.status(201).json({ message: "Animal added", animal });
});
app.put("/animals/:name", (req, res) => {
        const animalName = req.params.name;
        console.log("animalName", animalName);
        const identifiedAnimal = dataForTest.findIndex(el => el.animal === animalName)
        if (identifiedAnimal === -1) { dataForTest.push({ id: nanoid(), ...req.body }) }
        else{dataForTest.splice(identifiedAnimal,1,{...req.body })}
        res.status(201).json(dataForTest)
})

app.delete("/animals/:name", (req, res) => {
        const animalName = req.params.name;
        const identifiedAnimal = dataForTest.findIndex(el => el.animal === animalName);
        if (identifiedAnimal === -1) { res.status(404).send("No animal was matched based on the name.") }
        else{        dataForTest.splice(identifiedAnimal, 1);
        res.status(200).json(dataForTest)}

})


app.listen(PORT, () => {
  console.log(`Your app is working on port ${PORT} 😊.`);
});
