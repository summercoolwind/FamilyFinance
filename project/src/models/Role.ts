export {};
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required:true,
    },
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Role', RoleSchema,'Role');