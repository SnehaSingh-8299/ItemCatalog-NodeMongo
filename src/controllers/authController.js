const validation = require('../middlewares/validation/index');
const bcrypt = require('bcryptjs');
const model = require('../models/index');
const services = require('../helpers/index');

module.exports = {
  async register(req, res, next) {
    try {
      await validation.auth.signup(req);
      const { email, password } = req.body;
      const existingUser = await model.user.findOne({ email });
      if (existingUser) {
        throw new Error(services.message.USERALREADYEXIST);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await model.user({
        email: email,
        password: hashedPassword,
      }).save();
      const token = await services.utility.getToken({ _id: user._id });
      const refreshToken = await services.utility.getRefreshToken({ _id: user._id });
      return res.success(services.message.SUCCESSMSG, { token, refreshToken });
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      await validation.auth.login(req);
      const { email, password } = req.body;
      const user = await model.user.findOne({ email });
      if (!user) {
        throw new Error(services.message.INVALIDCREDS);
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error(services.message.INVALIDCREDS);
      }
      const token = await services.utility.getToken({ _id: user._id });
      const refreshToken = await services.utility.getRefreshToken({ _id: user._id });
      return res.success(services.message.SUCCESSMSG, { token, refreshToken });
    } catch (error) {
      next(error);
    }
  },
  async verifyRefreshToken(req, res, next) {
    try {
      const token = await services.utility.getToken({
        _id: req.decoded._id
      });
      const refreshToken = await services.utility.getRefreshToken({
        _id: req.decoded._id
      });
      return res.success(services.message.SUCCESSMSG, { token, refreshToken });
    } catch (error) {
      next(error);
    };
  },
}

