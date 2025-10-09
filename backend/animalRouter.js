
//express, router, mongoose
const express = require("express");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
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
    else { return res.send({ messageTry: `Animal ${newAnimal.name} was already added.` }) }
  }
  catch (error) { return res.send({ errorCatched: error.message }) }
});

router.put("/:name", async (req, res, next) => {
  try{  const { error } = animalJoi.validate(req.body);
  if (error) { return res.send({ errorJoi: error.message }) }
  
  const replacedAnimal = await AnimalMongo.findOneAndReplace({ name: req.params.name }, req.body, { new: true, upsert: false })
  if (!replacedAnimal) { return res.send({ message: `Animal does not exist in the list.` }) }
  else{return res.send(replacedAnimal)}}
  catch(error){return res.send({errorCaught: error.message})}
})

router.patch("/:name", async (req, res, next) => {
  try {
    const { error } = animalJoi.validate(req.body, {allowUnknown:true});
    if (error) { return res.send({ errorJoi: error.message }) }
    const updatePartialAnimal = await AnimalMongo.findOneAndUpdate({ name: req.params.name }, req.body, { new: true, upsert: false })
    if (updatePartialAnimal) { return res.send({ message: updatePartialAnimal }) }
    else{return res.send({ message: `Animal does not exist in the list.` })}
   }
  catch(error){return res.send({errorCaught: error.message})}
})

router.delete("/:name", async (req,res,next) => {
  try { 
    const deleteAnimal = await AnimalMongo.findOneAndDelete({ name: req.params.name })
    if (!deleteAnimal) { return res.send({ messageTry: `Item not found` }) }
    else{return res.send(deleteAnimal)}

  }
  catch(error){return res.send({errorCaught: error.message})}
})
module.exports=router
