const model = require('../models/index');
const validation = require('../middlewares/validation/index');
const responseMSg = require('../helpers/index');

module.exports = {
    async createItem(req, res, next) {
        try {
            await validation.item.createItem(req);
            const newItem = await model.item(req.body).save();
            return res.success(responseMSg.message.ADDEDMSG, newItem);
        } catch (error) {
            next(error);
        }
    },
    async updateItem(req, res, next) {
        try {
            await validation.item.updateItem(req);

            const updatedItem = await model.item.findByIdAndUpdate(req.params.id, {$set : req.body}, { new: true });
            console.log('req.params.id: ', req.params.id);
            if (updatedItem == null) {
                throw new Error(responseMSg.message.INVALIDREQUESTID);
            }
            return res.success(responseMSg.message.UPDATEDMSG, updatedItem);
        } catch (error) {
            next(error);
        }
    },
    async deleteItem(req, res, next) {
        try {
            await model.item.findByIdAndUpdate(req.params.id, { $set: { isDeleted: true } });
            return res.success(responseMSg.message.DELETEMSG, {});
        } catch (error) {
            next(error);
        }
    },
    async getAllItems(req, res, next) {
        try {
            const page = req.query?.page || 0;
            const limit = req.query?.limit || 10;
            const skip = page * limit || 0;
            const items = await model.item.find({ isDeleted: false }).sort({
                _id: -1
            }).skip(skip).limit(limit);
            const counts = await model.item.countDocuments({ isDeleted: false });
            return res.success(responseMSg.message.FETCHDATA, { items, counts });
        } catch (error) {
            next(error);
        }
    },
    async getItemById(req, res, next) {
        try {
            const item = await model.item.findById(req.params.id);
            if (item == null) {
                throw new Error(responseMSg.message.INVALIDREQUESTID);
            }
            return res.success(responseMSg.message.FETCHDATA, item);
        } catch (error) {
            next(error);
        }
    }
};
