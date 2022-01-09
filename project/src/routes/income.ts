export { };
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Income = require('../models/Income');
const findSixMonthSummaryByUserId = require('./findSixMonthSummaryByUserId');

// 理财界面加载实现
router.get('/', ensureAuth, (req, res, next) => {
    try {
        Income.find({ user: req.user._id }).sort({ day: -1 }).then((results) => {
            let incomes = results.map(result => {
                const date = new Date(result.day);
                return {
                    id:result._id,
                    value: `${result.value}`,
                    day: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
                    time: result.time
                };
            });
            res.render('income', {
                userName: req.user.name,
                userId: req.user._id,
                incomes: incomes
            });
        });
    } catch (err) { 
        next(err);
    }
});

// 查询近6个月数据
router.get('/query/summary', ensureAuth, async (req, res) => {
    let result = await findSixMonthSummaryByUserId(req.user._id, Income);
    res.send(result);
});

// 添加收入界面加载
router.get('/add', ensureAuth, (req, res) => {
    res.render('addincome', {
        userName:req.user.name,
        userId: req.user._id,
    });
});

// 添加收入记录
router.post('/add', ensureAuth, (req, res, next) => {
    let { body } = req;
    let { day } = body;
    let isoDate = new Date(day);
    let income = new Income({ ...body, day:isoDate, user: req.user._id});
    income.save(income, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.redirect('/income');
        }
    });
});

//  删除收入记录
router.post('/delete', ensureAuth, (req, res, next) => {
    try {
        const incomeId = req.body.id;
        Income.deleteOne({ _id: incomeId }).then(result => {
            res.status(200);
            res.send('');
        });
    } catch (err) { 
        next(err);
    }
});

module.exports = router;