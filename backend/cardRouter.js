const express = require("express");
const router = express.Router();
const NewMongooseCard = require("./schemas/schemaMongoose");

router.post("/", async(req,res,next) => {
        try {
                const upsertCard = await NewMongooseCard.findOneAndUpdate({ idFrontend: req.body.idFrontend }, req.body, { new: true, upsert: true, runValidators: true });
                res.status(200).json(upsertCard)
        }
        catch(error){next(error)}
})
module.exports = router





