export {};
const mongoose = require('mongoose');

const UserRoleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    roleId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('UserRole', UserRoleSchema,'UserRole');