
const mongoose = require("mongoose");

const newCardMongo = new mongoose.Schema({
        id: { type: String, required: true },
        date: { type: Date, required: true },
        type: { type: Boolean, required: true },
        category: { type: String, required: true },
        details: { type: String, required: true, default:""  },
        amount: { type: String, required: true  } 
})

const newCardMongoose = mongoose.Model("NewCardMongo", newCardMongo, "moneyGuard-cards" )

module.exports = newCardMongoose;
/*
const mongoose = require("mongoose");

const animalMongoSchema = new mongoose.Schema({
        name: { type: String, minLength: 3, maxLength: 20, required: true },
        carnivor: { type: Boolean, default: false },
        details: { type: String, minLength: 3, maxLength: 300, required: true},
        feet: {type: mongoose.Schema.Types.Mixed, default:"several"}
})
const animalMongoModel = mongoose.model("AnimalMongo", animalMongoSchema, "animals")
module.exports = animalMongoModel
*/