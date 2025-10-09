const Joi = require("joi");

const animalJoi = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        carnivor: Joi.boolean(),
        details: Joi.string().min(3).max(100).required(),
        feet: Joi.alternatives().try(
                Joi.number().valid(0, 2, 4, 6, 8),
                Joi.string().valid("several")
        )
})

module.exports = animalJoi

/*
const Joi = require("joi");


const animalJoi = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        carnivor: Joi.boolean().default(false),
        details: Joi.string().min(0).max(50).default(""),
        feet: Joi.alternatives().try(
                Joi.number().valid(2, 4, 6, 8),
                Joi.string().valid("several")
        )
})
module.exports = animalJoi;
*/