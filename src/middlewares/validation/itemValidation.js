const joi = require("joi").defaults((schema) => {
    switch (schema.type) {
        case "string":
            return schema.replace(/\s+/, " ");
        default:
            return schema;
    }
});
const validateSchema = async (inputs, schema) => {
    try {
        const { error, value } = schema.validate(inputs);
        if (error) throw error.details ? error.details[0].message.replace(/['"]+/g, '') : "";
        else return false;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    async createItem(req, property = 'body') {
        let schema = joi.object().keys({
            name: joi.string().required().min(4).max(50).regex(/^\w+(?:\s+\w+)*$/),
            description: joi.string().optional()
        });
        return await validateSchema(req[property], schema);
    },
    async updateItem(req, property = 'body') {
        let schema = joi.object().keys({
            name: joi.string().optional(),
            description: joi.string().optional()
        });
        return await validateSchema(req[property], schema);
    }
}