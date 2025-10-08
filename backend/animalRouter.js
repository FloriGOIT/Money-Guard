const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Joi = require("joi");
const animalJoi = require("./schemas/schemaJoi.js");
const animals = [{ id: 12345, name: "cat", carnivor: true, details: "friendly with humans" },];
//TRY AND CATCH  mandatory     module.exports = router; return mandatory
router.get("/", (req, res) => {res.json(animals);});
router.post("/", (req, res, next) => {
  try {
    const { error } = animalJoi.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newAnimal = { id: nanoid(), details: "", ...req.body };
    animals.push(newAnimal);
    res
      .status(200)
      .json({ message: `Item: ${newAnimal.name} was added to the list.` });
  } catch (error) {
    res.json({ message: error.message });
  }
});
router.put("/:name", (req, res, next) => {
  try {
    const animalName = req.params.name;
    const indexAnimal = animals.findIndex((el) => el.name === animalName);
    if (indexAnimal === -1) {
      const newAnimal = { id: nanoid(), details: "", ...req.body };
      animals.push(newAnimal);
      res
        .status(200)
        .json({ message: `Item: ${newAnimal.name} was ADDED to the list.` });
    } else {
      const updateAnimal = animals.find((el) => el.name === animalName);
      Object.assign(updateAnimal, req.body);
      res
        .status(200)
        .json({
          message: `Item: ${updateAnimal.name} was UPDATED to the list.`,
        });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});
router.delete("/:name", (req, res, next) => {
  try {
    const animalName = req.params.name;
    const indexAnimal = animals.findIndex((el) => el.name === animalName);
    if (indexAnimal === -1) {
      res
        .status(200)
        .json({
          message: `Item ${animalName} was not found in the list of animals.`,
        });
    } else {
      animals.splice(indexAnimal, 1);
      res
        .status(200)
        .json({
          message: `Item ${animalName} was deleted from the list of animals.`,
        });
    }
  } catch (error) {
    res.json({ mesage: error.message });
  }
});

module.exports = router;

// do i use try + catch even on get request?
