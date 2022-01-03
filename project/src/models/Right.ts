export {};
const mongoose = require('mongoose');

const RightSchema = new mongoose.Schema({
    id: {
        type: Number,
        required:true,
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Right', RightSchema,'Right');