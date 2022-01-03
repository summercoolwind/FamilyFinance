export {};
const mongoose = require('mongoose');

const FamilySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ownerUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Family', FamilySchema,'Family');