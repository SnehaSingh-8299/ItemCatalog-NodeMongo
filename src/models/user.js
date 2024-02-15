const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique : true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        default: "",
        index: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    
});

module.exports = mongoose.model('user', userSchema);