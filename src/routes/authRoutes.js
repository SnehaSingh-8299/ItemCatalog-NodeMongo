const express = require("express");
const router = express.Router();
const authController = require('../controllers/index');
const authValidation = require("../middlewares/authorization/authMiddleware")
/*
AUTH acess
*/
router.post('/register', authController.auth.register);
router.post('/login', authController.auth.login);
router.get('/verifyRefreshToken', authValidation.verifyAccessToken, authController.auth.verifyRefreshToken);

module.exports = router;