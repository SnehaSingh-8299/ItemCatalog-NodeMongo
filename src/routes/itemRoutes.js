const express = require("express");
const router = express.Router();
const itemController = require('../controllers/index');
const  authMiddleware   = require('../middlewares/authorization/authMiddleware');
/*
ItemCrud
*/
router.post('/createItem', authMiddleware.authenticateToken("user"), itemController.items.createItem);
router.put('/:id', authMiddleware.authenticateToken("user"), itemController.items.updateItem);
router.delete('/:id', authMiddleware.authenticateToken("user"), itemController.items.deleteItem);
router.get('/getAllItems', authMiddleware.authenticateToken("user"), itemController.items.getAllItems);
router.get('/:id', authMiddleware.authenticateToken("user"), itemController.items.getItemById);

module.exports = router;