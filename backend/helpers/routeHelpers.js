const Joi = require("@hapi/joi");

const validateParam = (schema, name) => {
    return (req, res, next) => {
        console.log("params", req.params[name]);
        const validatorResult = schema.validate({ param: req.params[name] });
        console.log("result", validatorResult);
        if (validatorResult.error) {
            return res.status(400).json(validatorResult.error);
        } else {
            if (!req.value) req.value = {};
            if (!req.value["params"]) req.value.params = {};
            req.value.params[name] = req.params[name];
            console.log("request.value output: ", req.value);
            next();
        }
    };
};

const schemas = {
    idSchema: Joi.object().keys({
        param: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required(),
    }),
};

module.exports = {
    validateParam,
    schemas,
};
