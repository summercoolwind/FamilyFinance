/**
 * api请求server
 *
 * 0：成功
 * 1：数据不合法
 * 2：客户端数据错误
 * 3：后端错误
 */
import Express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import config from '../../config';
const httpProxy = require('http-proxy');
const compression = require('compression');
const connectHistoryApiFallback = require('connect-history-api-fallback')
const app = Express();
const path = require('path')
import CustomRequest from './CustomRequest'
import Utils from './Utils'
app.all('*', function(req:CustomRequest, res, next){
    console.log("access server " + req.url + " method:" + req.method);
    next();
});
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));
app.use('/',Express.static(path.join(__dirname,'../..','client')));
// app.use(favicon(path.join(__dirname,'..','static','favicon.ico')));
app.use('/', connectHistoryApiFallback());
app.use(compression());
app.use(cookieParser('express_react_cookie'));
app.use(session({
    secret:'express_react_cookie',
    resave: true,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 1000 * 30}//过期时间
}));
//展示页面路由
app.use('/api', require("./main"));

//管理页面路由
app.use('/api/admin', require("./admin"));

mongoose.set('useFindAndModify', false);
mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`,  (dbErr) =>{
    if (dbErr) {
        console.log(dbErr, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(config.apiPort, () =>{
        console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`)
    });
});