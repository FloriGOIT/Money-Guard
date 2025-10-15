const { required } = require("joi");
const { min, max } = require("lodash");
const mongoose = require("mongoose");

const animalMongoSchema = new mongoose.Schema({
        name: { type: String, minLength: 3, maxLength: 20, required: true },
        carnivor: { type: Boolean, default: false },
        details: { type: String, minLength: 3, maxLength: 300, required: true},
        feet: {type: mongoose.Schema.Types.Mixed, default:"several"}
})
const animalMongoModel = mongoose.model("AnimalMongo", animalMongoSchema, "animals")
module.exports = animalMongoModel
