
//express, nanoid, router, mongoose
const express = require("express");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const animalJoi = require("./schemas/schemaJoi.js");
const AnimalMongo = require("./schemas/schemaMongoose.js");


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log(`Connection to Mongo has been made.`))
.catch((error)=>console.log(`Connection to Mongo failed.`, error.message))

router.get("/", async (req, res, next) => {
  try {
    const defaultData = await AnimalMongo.find()
    return res.send(defaultData)
   }
catch(error){ return res.send({message: error.message})}})

router.post("/", async (req, res, next) => {
  try {
    const { error } = animalJoi.validate(req.body)
    if (error) { return res.send({ messageJoi: error.message }) }
    const newAnimal = new AnimalMongo(req.body);
    const dbInfo = await AnimalMongo.find({});
    const isDuplicated = dbInfo.findIndex(el => el.name === newAnimal.name);
    if (isDuplicated === -1) {
      await newAnimal.save();
      return res.send({ messageTry: `Animal ${newAnimal.name} was added.` })
    }
    else{return res.send({messageTry: `Animal ${newAnimal.name} was already added.`})}

   }
  catch(error){return res.send({errorCatched: error.message})}
})

router.put("/:name", async (req, res, next) => {
  try { 
    const { error } = animalJoi.validate(req.body)
    if(error){return res.send({errorJOi: error.message})}
    const nameParam = req.params.name;
    const dbInfo = await AnimalMongo.find({});
    const isDuplicated = dbInfo.findIndex(el => el.name === nameParam);
    if (isDuplicated === -1) {
      const newAnimal = new AnimalMongo(req.body);
      await newAnimal.save();
      return res.send({messageTry: `Animal ${newAnimal.name} was added not updated.` })
    }
    else {
      const animalFiltered = dbInfo.find(el=> el.name ===nameParam)
      const updateAnimal = await AnimalMongo.findByIdAndUpdate(animalFiltered.id, req.body);
      return res.send({messageTry: `Animal ${animalFiltered.name} was updated not added.`})

    }

  }
  catch(error){return res.send({errorCatched: error.message})}
})

module.exports=router
