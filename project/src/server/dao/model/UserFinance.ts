import mongoose from 'mongoose';
var UserFinance = require('../schemas/UserFinance');

export default UserFinance = mongoose.model('UserFinance',UserFinance,'UserFinance');