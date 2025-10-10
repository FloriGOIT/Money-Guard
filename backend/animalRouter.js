
//express, router, mongoose
const express = require("express");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");
const animalJoi = require("./schemas/schemaJoi.js");
const AnimalMongo = require("./schemas/schemaMongoose.js");

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log(`Connection to Mongo has been made.`))
  .catch((error) => console.log(`Connection to Mongo failed.`, error.message))
const APIcall =
  "https://pixabay.com/api/?key=42799638-b50871d8c9a958480a9d6ba7c&image_type=photo&pretty=true&per_page=4";//&q=london

const handleFetch = async (value) =>
{
  try { 
    const fetching = await fetch(`${APIcall}&q=${value}`);
    console.log(fetching)
    if (!fetching.ok) { console.log("error1: ",error.message) }
    const parsefetch = await fetching.json();
    return parsefetch.hits
  }
  catch(error){console.log("error2: ", error.message)}
 }


router.get("/", async (req,res,next) => {
try{  //const queryValue = req.query.name ? { name: req.query.name.trim() } : {};
  const data = await handleFetch(req.query.name);
  const finalInfo = data.map(el => { const newEl = { name: `${req.query.name}-${el.id}`, details: el.tags }; return newEl });

    res.status(200).send(finalInfo);
  }
  catch(error){next(error)}
})

  
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
