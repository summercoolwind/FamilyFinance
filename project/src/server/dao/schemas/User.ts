var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name:String,
    password:String,
    userRoleId:Number
});