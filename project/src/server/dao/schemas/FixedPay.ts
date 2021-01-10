var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    value:Number,
    startTime:Date,
    endTime:Date,
    period:Number,
    userId:Number
});