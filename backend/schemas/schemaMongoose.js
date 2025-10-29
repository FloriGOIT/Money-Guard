
const mongoose = require("mongoose");

const newCardDbSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
    validateAmount: {
      validator: function (value){return value !== 0 && value.trim.length > 0;},
      message: "Please enter a number higher than 0 and for decimals use dot.",
    },
  },

  category: { type: String, required: true },
  color: { type: String, required: true },
  date: { type: String, required: true },
  details: { type: String, required: true, maxLength: 48 },
  idFrontEnd: { type: String, required: true },
  month: { type: String, required: true },
  income: { type: Boolean, required: true },
  year: { type: String, required: true, minLength: 4, maxLength: 4 },
});

const NewMongooseCard = mongoose.model(
  "NewMongooseCard",
  newCardDbSchema,
  "moneyGuard-cards"
);

module.exports = NewMongooseCard;


