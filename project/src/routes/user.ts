export { };
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Role = require('../models/Role');
const User = require('../models/User');

// 用户界面加载实现
router.get('/', ensureAuth, (req, res) => {
    User.find({ id: req.user._id }, (err, results) => {
        if (err) {
            res.render('error/500',{
                layout:'login'
            });
        } else if(results.length > 0){
             Role.find().lean().then((roles) => {
                 let result = results[0];
                res.render('user', {
                    userName: result.name,
                    userPassword: result.password,
                    roleId: result.role,
                    roles: roles
                });
            });
        }
    });
});

// 添加用户
router.post('/add', (req, res) => {
    let { body } = req;
    let { name } = body;
    User.find({ name: name }, (err, results) => {
        if (err) {
            console.log(err);
            res.render('error/500');
        } else if (results.length > 0) {
            res.render('register',{
                layout: 'login',
                errorMsg: '用户已经存在，请重新注册'
            });
        } else {
            let user = new User(body);
            user.save(user, (err, result) => {
                if (err) {
                    console.log(err);
                    res.render('/error/500',{
                        layout:'login'
                    });
                } else {
                    res.render('login', {
                        layout: 'login'
                    });
                }
            });
        }
    });
});

// 更新用户信息目前没有使用，更新后需要刷新登录信息里的用户信息
router.post('/update', ensureAuth, (req, res) => {
    let { body } = req;
    let user = new User({ id: req.user._id });
    let { password, roleId } = body;
    User.updateOne(user, {password,role:roleId},(err, result) => {
        if (err) {
            console.log(err);
            res.render('error/500',{
                layout:'login'
            });
        }
    });
});

module.exports = router;