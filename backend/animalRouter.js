
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const AnimalMongoModel = require("./schemas/schemaMongoose");
const router = express.Router();
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("🟢 Connected to Mongoose."))
.catch(() => console.log("🔴 Issue when connecting to Mongoose."))

const APIcall = "https://pixabay.com/api/?key=42799638-b50871d8c9a958480a9d6ba7c&image_type=photo&pretty=true&per_page=3&q=";//london

const handleFetch = async (value) => {
  const fullAPISite = `${APIcall}${value}`;
  try { 
    const fetching = await fetch(fullAPISite);
    if (!fetching.ok) { console.log("Issue when fetching API."); return }
    const data = await fetching.json();
    return(data.hits)
  }
  catch(error){console.log(error.message)}
}


router.post("/:name", async (req, res, next) =>
{  try { const animalName = req.params.name;
    const fetchingData = await handleFetch(animalName)
    const arrData = [];
    for (let el of fetchingData) {
      const newAnimal = {name:`${animalName}-${el.id}`, details:el.tags}
      const createSaveAnimal = await AnimalMongoModel.create(newAnimal);
      arrData.push(newAnimal);
    }
    return res.status(200).send(arrData)
  }
  catch(error){return next(error)}
})

router.get("/", async (req, res, next) => {
  try { 
    const animalNameQuery  = req.query.name;
    const animalName = req.query.name ? { name: {$regex: new RegExp("^"+ animalNameQuery, "i")} } : {};
    const dataDB = await AnimalMongoModel.find(animalName).lean();
    return res.status(200).send(dataDB)
  }
  catch(error){return next(error)}
})

router.delete("/", async (req, res, next) => {
  try { 
    const animalNameQuery = req.query.name;
    const animalName = animalNameQuery ? {name:{$regex: new RegExp("^" + animalNameQuery, "i")}} : {}
    const dataToBeDel = await AnimalMongoModel.find(animalName);
    await AnimalMongoModel.deleteMany(animalName);
    return res.status(200).send(dataToBeDel)
  }
  catch(error){return next(error)}
})

module.exports = router;