export {};
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Role = require('../models/Role');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const User = require('../models/User');

// 默认路由实现
router.get('/', ensureGuest, (req, res) => {
    // 默认登录页面
    res.redirect('/login');
});


// 登录实现加载
router.get('/login', (req, res) => {
    res.render('login', {
        layout:'login'
    });
});

// 主页实现
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard',{
        userName: req.user.name
    });
});

// 登出页面
router.get('/logout', ensureAuth, (req, res) => {
    req.logout();
    res.redirect('/');                                
});

// 注册页面
router.get('/register',  (req, res, next) => {
    try {
        Role.find().lean().then((roles) => {
            res.render('register', {
                 layout: 'login',
                 roles: roles
            }); 
        });
    } catch (err) {
        next(err);
    }                           
});

// 登录接口
router.post('/auth',
    passport.authenticate('local',
        { failureRedirect: '/login', successRedirect: '/dashboard' })
);
module.exports = router;
