const _ = require("lodash");
const jwt = require("jsonwebtoken");

module.exports = {
    async getToken(data) {
        try {
            return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: process.env.SECRET_KEY_EXPIRY });
        } catch (error) {
            throw error;
        }
    },
    async getRefreshToken(data) {
        try {
            return jwt.sign(data, process.env.REFRESH_SECRET_KEY, { expiresIn: process.env.REFRESH_SECRET_KEY_EXPIRY });
        } catch (error) {
            throw error;
        }
    },
    async verifyToken(token) {
        try {
            return jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            throw error;
        }
    },
    async verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_SECRET_KEY);
        } catch (error) {
            throw error;
        }
    },
    async prettyCase(str) {
        if (typeof str === "string" && /^[A-Z_]+$/.test(str)) {
            str = _.lowerCase(str);
            str = _.startCase(str);
        }
        return str;
    }
};