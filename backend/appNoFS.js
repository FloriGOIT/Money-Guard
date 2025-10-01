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

const PORT = 3000;
const app = express();

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => { res.status(200).send("Hello amaizing world! 🌍") })

app.get("/animals", (_, res) => { res.status(200).json(dataForTest) })
app.post("/animals", (req, res) => {
        const animalName = req.body.animal;
        const isDuplicatedAnimal = dataForTest.findIndex(el => el.animal === animalName)
        if(isDuplicatedAnimal === -1){        const animal = { id: nanoid(), ...req.body };
        dataForTest.push(animal);
                res.status(201).json({ message: "Animal added", animal });
        }
        else{res.status(400).json({ error: "Animal already preasent in the lits." })}

});
app.put("/animals/:name", (req, res) => {
        const animalName = req.params.name;
        const findAnimalByName = dataForTest.find(el => el.animal === animalName);
        if (findAnimalByName === undefined) { dataForTest.push({id:nanoid(), ...req.body})}
        else { Object.assign(findAnimalByName, {...findAnimalByName,...req.body}) }
        res.status(201).json({message:`${animalName} was updated.`})
})

app.delete("/animals/:name", (req, res) => {
        const animalName = req.params.name;
        const identifiedAnimal = dataForTest.findIndex(el => el.animal === animalName);
        if (identifiedAnimal === -1) { res.status(404).send("No animal was matched based on the name.") }
        else{        dataForTest.splice(identifiedAnimal, 1);
        res.status(200).json({message: `${animalName} item was deleted.`})}

})


app.listen(PORT, () => {
  console.log(`Your app is working on port ${PORT} 😊.`);
});
