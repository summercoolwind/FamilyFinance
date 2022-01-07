export { };
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Income = require('../models/Income');
const findSixMonthSummaryByUserId = require('./findSixMonthSummaryByUserId');
// 用户界面加载实现
router.get('/', ensureAuth, (req, res, next) => {
    Income.find({ user: req.user._id }, (err, results) => {
        if (err) {
            next(err);
        } else {
            let incomes = results.map(result => {
                return { value: `${result.value}`, day: result.day, time: result.time };
            });
            res.render('income', {
                userName:req.user.name,
                userId: req.user._id,
                incomes: incomes
            });
        }
    });
});

// 用户界面加载实现
router.get('/query', ensureAuth, async (req, res) => {
    let incomes = await Income.find({ user: req.user._id }).lean();
    res.send(incomes);
});

// 用户界面加载实现
router.get('/query/summary', ensureAuth, async (req, res) => {
    let result = await findSixMonthSummaryByUserId(req.user._id, Income);
    res.send(result);
});

// 添加用户
router.get('/add', ensureAuth, (req, res) => {
    res.render('addincome', {
        userName:req.user.name,
        userId: req.user._id,
    });
});

// 添加支出记录
router.post('/add', ensureAuth, (req, res, next) => {
    let { body } = req;
    let { day } = body;
    let isoDate = new Date(day);
    let income = new Income({ ...body, day:isoDate, user: req.user._id});
    income.save(income, (err, result) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.redirect('/income');
        }
    });
});

// 更新用户信息目前没有使用，更新后需要刷新登录信息里的用户信息
router.post('/delete', ensureAuth, (req, res) => {
    
});

module.exports = router;