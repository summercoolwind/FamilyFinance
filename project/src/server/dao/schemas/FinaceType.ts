var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    typeName:String,
    dayRateReturn:Number,
    isPeriod:Boolean,
    isCompound:Boolean
});