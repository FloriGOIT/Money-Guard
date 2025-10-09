const { required } = require("joi");
const { min, max } = require("lodash");
const mongoose = require("mongoose");

const animalMongoSchema = new mongoose.Schema({
        name: { type: String, minLength: 3, maxLength: 20, required: true },
        carnivor: { type: Boolean, default: false },
        details: { type: String, minLength: 3, maxLength: 100, required: true},
        feet: {type: mongoose.Schema.Types.Mixed, default:"several"}
})

const animalMongoModel = mongoose.model("AnimalMongo", animalMongoSchema, "animals")
        
module.exports = animalMongoModel




//const newAnimal = new AnimalMongo(req.body)
// const saveNewAnimal =await newAnimal.save()

/*

, 
const mongoose = require("mongoose")

const animalMongooseSchema = new mongoose.Schema({
        animal: { type: String, required: true, minLength: 3, maxLength: 20 },
        carnivor: { type: Boolean, default: false },
        preferes: {type: String, required: true, minLength:3, maxLength:50}
})

const AnimalMongo = mongoose.model("AnimalMongo", animalMongooseSchema, "animals")
module.exports = AnimalMongo
 */