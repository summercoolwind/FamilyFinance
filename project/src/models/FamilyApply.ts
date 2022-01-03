export {};
const mongoose = require('mongoose');

const FamilyApplySchema = new mongoose.Schema({
    applyUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family'
    }
});

module.exports = mongoose.model('FamilyApply', FamilyApplySchema,'FamilyApply');