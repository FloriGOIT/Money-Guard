const express = require("express");
const router = express.Router();
const NewMongooseCard = require("../backend/schemas/schemaMongoose");

router.post("/", async (req, res, next) => {
  try {
    const upsertCard = await NewMongooseCard.findOneAndUpdate(
      { idFrontend: req.body.idFrontend },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    return res.status(200).json(upsertCard);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const cardListDB = await NewMongooseCard.find({});
    return res.status(200).json(cardListDB);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
