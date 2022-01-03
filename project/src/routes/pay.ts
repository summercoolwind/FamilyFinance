export { };
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Pay = require('../models/Pay');
const User = require('../models/User');

// 用户界面加载实现
router.get('/', ensureAuth, (req, res) => {
    Pay.find({ user: req.user._id }, (err, results) => {
        if (err) {
            res.render('error/500');
        } else {
            let pays = results.map(result => {
                return { value: `${result.value}`, day: result.day, time: result.time };
            });
            res.render('pay', {
                userName:req.user.name,
                userId: req.user._id,
                pays: pays
            });
        }
    });
});

// 用户界面加载实现
router.get('/query', ensureAuth, async (req, res) => {
    let pays = await Pay.find({ user: req.user._id }).lean();
    res.send(pays);
});

// 用户界面加载实现
router.get('/query/summary', ensureAuth, async (req, res) => {
    let pays = await Pay.find({ user: req.user._id }).lean();
    res.send(pays);
});

// 添加用户
router.get('/add', ensureAuth, (req, res) => {
    res.render('addpay', {
        userName:req.user.name,
        userId: req.user._id,
    });
});

// 添加用户
router.post('/add', ensureAuth, (req, res) => {
    let { body } = req;
    let pay = new Pay({ ...body,  user: req.user._id});
    pay.save(pay, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error/500',{
                layout:'login'
            });
        } else {
            res.redirect('/pay');
        }
    });
});

// 更新用户信息目前没有使用，更新后需要刷新登录信息里的用户信息
router.post('/delete', ensureAuth, (req, res) => {
    
});

module.exports = router;