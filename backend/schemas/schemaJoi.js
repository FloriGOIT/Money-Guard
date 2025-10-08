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