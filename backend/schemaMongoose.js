
const mongoose = require("mongoose")

const animalMongooseSchema = new mongoose.Schema({
        animal: { type: String, required: true, minLength: 3, maxLength: 20 },
        carnivor: { type: Boolean, default: false },
        preferes: {type: String, required: true, minLength:3, maxLength:50}
})

const AnimalMongo = mongoose.model("AnimalMongo", animalMongooseSchema)
module.exports = AnimalMongo
 
//const newAnimal = new AnimalMongo(req.body)
// const saveNewAnimal =await newAnimal.save()