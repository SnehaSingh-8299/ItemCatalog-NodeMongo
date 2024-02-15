const utility = require("../helpers/utility");

module.exports = () => (req, res, next) => {
    res.success = async(message, data) => {
        message = await utility.prettyCase(message);
        console.log(data,"ddd")
        const resData = {
            statusCode: 1,
            message: message,
            data : data || {}
        };
        return res.status(200).json(resData);
    };
    res.failure = async (message, data) => {
        message = await utility.prettyCase(message);
        const resData = {
            statusCode: 0,
            message: message,
            data: data || {}
        };
        return res.status(400).json(resData);
    };
    res.unauthorizedResponse = async (message) => {
        message = await utility.prettyCase(message);
        const data = {
            status: 0,
            message: message
        };
        return res.status(401).json(data);
    };
    next();
};
