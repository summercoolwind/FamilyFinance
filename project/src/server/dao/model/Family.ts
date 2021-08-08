var mongoose = require('mongoose');
var Family = require('../schemas/Family');

module.exports = mongoose.model('Family',Family,'Family');