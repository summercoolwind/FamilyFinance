export {};
const mongoose = require('mongoose');

const FinanceTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        required: true,
    },
    dayRateReturn: {
        type: Number,
        required: true,
    },
    isPeriod: {
        type: Boolean,
        default:false
    },
    isCompound:{
        type: Boolean,
        default:false
    },
});

module.exports = mongoose.model('FinanceType', FinanceTypeSchema,'FinanceType');