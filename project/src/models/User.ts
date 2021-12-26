import UserRole from "../server/model/UserRole";
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    userRoleId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema,'User');