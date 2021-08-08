var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    finaceTypeId:String,
    userId:String,
    startTime:Date,
    continueTime:Date
});