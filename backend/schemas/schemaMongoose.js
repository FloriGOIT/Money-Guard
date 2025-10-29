const { string, required, boolean } = require("joi");
const mongoose = require("mongoose");

const newCardDbSchema = new mongoose.Schema({
  amount: {
    type: string,
    required: true,
    validateAmount: {
      validator: function (value) {
        return value !== 0 && value.trim.length > 0;
      },
      message: "Please enter a number higher than 0 and for decimals use dot.",
    },
  },

  category: { type: String, required: true },
  color: { type: String, required: true },
  date: { type: String, required: true },
  details: { type: String, required: true, maxLength: 48 },
  idFrontEnd: { type: String, required: true },
  month: { type: String, required: true },
  income: { type: boolean, required: true },
  year: { type: string, required: true, minLength: 4, maxLength: 4 },
});

const NewMongooseCard = mongoose.model(
  "NewMongooseCard",
  newCardDbSchema,
  "moneyGuard-cards"
);

module.exports = NewMongooseCard;

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

                validate: {
                        validator: function (amount) {
                                return amount !== 0 && amount.trim.length > 0
                        },
                        message: "The amount entered must be higher than 0 and for decimals use dot."
                }
*/
