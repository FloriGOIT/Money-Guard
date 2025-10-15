
const Joi = require("joi");

const animalJoiSchema = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        detailes: Joi.string().min(3).max(300).required(),
        carnivor: Joi.boolean(),
        feet: Joi.alternatives().try(
                Joi.number().valid(0, 2, 4, 6, 8),
                Joi.string().valid("several")
        )
})

const errorJoiMiddleWare = (req, res, next) => {
        const { error } = animalJoiSchema.validate(req.body);
        if (error) {return res.status(400).send({ error: error.message }) }
        else{return next()}
}
module.exports = errorJoiMiddleWare;

/*
const Joi = require("joi");

const animalJoi = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        carnivor: Joi.boolean().required(),
        details: Joi.string().min(3).max(30).required(),
        feet: Joi.alternatives().try(
                Joi.number().valid(0, 2, 4, 6, 8),
                Joi.string().valid("several")
        )
})

const errorJoihandle = (req, res, next) => {
        const { error } = animalJoi.validate(req.body);
        if (error) { return res.status(400).send({ error: error.message }) }
        next()
}

module.exports = errorJoihandle

*/