const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const config = require('./config/config');
const connectDB = require('./dao/db');
// 连接数据库，异步任务，连接失败就退出程序
connectDB();

const app = express();
require('./config/passport')(passport);
// 日志
if(process.env.NODE_EVN === 'development'){
    app.use(morgan('dev'));
}

// 视图模版
handlebars.create({
    helpers: {
        ifEquals:function(a1,a2,options)  {
            return a1 === a2 ? options.fn(this) : options.inverse(this);
        }
    }
});
app.engine('.hbs', handlebars.engine());
app.set('view engine', '.hbs');

app.use(session({
    secret:'keyboard hahahhahaha',
    resave: false
}));
// 解析 application/json
app.use(bodyParser.json()); 
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// 设置认证中间件
app.use(passport.initialize());
app.use(passport.session());


// 路由文件
app.use('/', require('./routes/index'));// 默认路由实现
app.use('/user', require('./routes/user'));// 用户
app.use('/family', require('./routes/family'));// 家庭管理
app.use('/income', require('./routes/income'));// 收入管理
app.use('/pay', require('./routes/pay'));// 支出管理
app.use('/finance', require('./routes/finance'));// 理财管理

// 静态文件目录，css等 
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res) {
    res.render('error/404', {
        layout:'login'
    });
})
const PORT = config.PORT || 5000;
// 启动监听
app.listen(
    PORT,()=>{
        console.log(`Example app listening on port http://127.0.0.1:${PORT}`);
    }
);
