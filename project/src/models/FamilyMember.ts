export {};
const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
    familyUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family'
    }
});

module.exports = mongoose.model('FamilyMember', FamilyMemberSchema,'FamilyMember');