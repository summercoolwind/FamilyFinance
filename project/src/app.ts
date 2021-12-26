import express from 'express';
import morgan from 'morgan';
import handlebars from 'handlebars';
const config = require('./config/config');
const connectDB = require('./dao/db');
// connect db
connectDB();

const app = express();

// logging
if(process.env.NODE_EVN === 'development'){
    app.use(morgan('dev'));
}

// views
app.set('view engine','.hbs');

app.use('/',require('./routes/index'));

const PORT = config.PORT || 5000;

app.listen(
    PORT,()=>{
        console.log(`Example app listening on port http://127.0.0.1:${PORT}`);
    }
);
