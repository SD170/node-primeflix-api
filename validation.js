//validation
const Joi = require('@hapi/joi');   //for validating the input fields

const registerValidation = (data) =>{
    
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email({minDomainSegments: 2, tlds: {allow:['com','net']}}),
        password: Joi.string()
            .min(6)
            .required()
    })

    return schema.validate(data);
};

const loginValidation = (data) =>{
    
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email({minDomainSegments: 2, tlds: {allow:['com','net']}}),
        password: Joi.string()
            .min(6)
            .required()
    })

    return schema.validate(data);
};

const postCreationValidation = (data) =>{
    const schema = Joi.object({
        title: Joi.string()
        .required()
        .max(100)
        ,
        content: Joi.string()
        .required()
    })
    return schema.validate(data);
}

module.exports = {
    registerValidation: registerValidation,
    loginValidation: loginValidation,
    postCreationValidation: postCreationValidation
};

