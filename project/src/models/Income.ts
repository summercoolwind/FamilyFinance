export {};
const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Income', IncomeSchema,'Income');