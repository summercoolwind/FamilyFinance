export {};
const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    startDay: {
        type: Date,
        required: true,
    },
    continueDay: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    financeType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FinanceType'
    },
});

module.exports = mongoose.model('Finance', FinanceSchema,'Finance');