const joi = require("joi").defaults((schema) => {
    switch (schema.type) {
        case "string":
            return schema.replace(/\s+/, " ");
        default:
            return schema;
    }
});

module.exports = {
    async signup(req, property = 'body') {
        try {
            let schema = joi.object({
                email: joi.string().email().required().label('Email'),
                password: joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$'))
                    .required()
                    .messages({
                        'string.pattern.base': 'Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
                        'any.required': 'Password is required'
                    }).label('Password')
            });
            const { email, password } = req[property];
            const { error } = schema.validate({ email, password });
            if (error) {
                throw new Error(error.details ? error.details[0].message.replace(/['"]+/g, '') : "");
            }
            return false;
        } catch (error) {
            throw error;
        }
    },
    async login(req, property = 'body') {
        let schema = joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$'))
                .required()
                .messages({
                    'string.pattern.base': 'Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
                    'any.required': 'Password is required'
                }).label('Password')
        });
        const { email, password } = req[property];
        const { error } = schema.validate({ email, password });
        if (error) {
            throw new Error(error.details ? error.details[0].message.replace(/['"]+/g, '') : "");
        }
        return false;
    }
}