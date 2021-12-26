const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// 默认路由实现
router.get('/', ensureGuest, (req, res) => {
    // 默认登录页面
    res.render('login', {
        layout: 'login'
    });
});

// 主页实现
router.get('/dashboard', ensureAuth, (req, res) => {
    res.render('dashboard');
});

// 登出页面
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');                                
});

// 登出页面
router.get('/register', (req, res) => {
    res.render('register', {
        layout:'login'
    });                                
});

router.post('/auth',
    passport.authenticate('local',
        { failureRedirect: '/dashboard', successRedirect: '/dashboard' })
);
module.exports = router;
