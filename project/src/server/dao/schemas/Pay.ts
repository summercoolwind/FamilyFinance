var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    value:Number,
    dayTime:Date,
    userId:Number
});