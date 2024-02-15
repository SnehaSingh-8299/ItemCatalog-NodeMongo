const model = require("../../models/index");
const jwt = require("../../helpers/index");
const responseMSg = require("../../helpers/message");


module.exports.authenticateToken = (...args) => async (req, res, next) => {
  try {
    const roles = [].concat(args).map((role) => role.toLowerCase());
    const token = String(req.headers.authorization || "")
      .replace(/bearer|jwt/i, "")
      .replace(/^\s+|\s+$/g, "");
    let decoded;
    
    if (token) decoded = await jwt.utility.verifyToken(token);
    let doc = null;
    let role = "";
    if (!decoded && roles.includes("guest")) {
      role = "guest";
      return next();
    }
    if (roles.includes("user")) {
      role = "user";
      doc = await model.user.findById(decoded._id);
    }

    if (!doc) throw new Error(responseMSg.INVALID_TOKEN);
    if (role) req[role] = doc.toJSON();
    next();
  } catch (error) {
    const message =
      String(error.name).toLowerCase() === "error"
        ? error.message
        : responseMSg.UNAUTHORIZEDACCESS;
    return res.unauthorizedResponse(message);
  }
};
module.exports.verifyAccessToken = async (req, res, next) => {
  try {
    const token = String(req.headers.authorization || "")
      .replace(/bearer|jwt/i, "")
      .replace(/^\s+|\s+$/g, "");
    const decoded = await jwt.utility.verifyRefreshToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    const message = String(error.name).toLowerCase() === "error" ? error.message : responseMSg.UNAUTHORIZEDACCESS;
    return res.unauthorizedResponse(message);

  }
};