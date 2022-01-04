const mongoose = require('mongoose');

const PaySchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    day: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Pay', PaySchema,'Pay');