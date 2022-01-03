export {};
const mongoose = require('mongoose');

const RoleRightSchema = new mongoose.Schema({
    id: {
        type: Number,
        required:true,
    },
    roleId: {
        type: Number,
        required:true,
    },
    rightId: {
        type: Number,
        required:true,
    }
});

module.exports = mongoose.model('RoleRight', RoleRightSchema,'RoleRight');