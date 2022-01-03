export {};
const mongoose = require('mongoose');
const config = require('../config/config');
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(config.mongoDbUri ,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });

        console.log(`MongoDB Connecnted : ${conn.connection.host}`);
    } catch (err) {
         console.error(err);
         process.exit(1);
    }
}

module.exports = connectDB;