import mongoose from 'mongoose';
var User = require('../schemas/User');

export default User = mongoose.model('User',User,"User");