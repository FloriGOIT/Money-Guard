const express = require("express");
const router = express.Router();
const NewMongooseCard = require("./schemas/schemaMongoose");

router.post("/", async(req,res,next) => {
        try {
                const upsertCard = await NewMongooseCard.findOneAndUpdate({ idFrontend: req.body.idFrontend }, req.body, { new: true, upsert: true, runValidators: true });
                console.log("ok")
                return res.status(200).json(upsertCard)
        }
        catch (error){console.log("TRY");  next(error)}
})

router.get("/", async (req, res, next) => {
        try { 
                //const listCardsDb = await NewMongooseCard.find({});
                console.log("anna are mere"); return
        }
        catch(error){next(error)}
})

module.exports = router





