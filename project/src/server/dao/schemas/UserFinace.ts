var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    finaceTypeId:Number,
    userId:Number,
    startTime:Date,
    continueTime:Date
});