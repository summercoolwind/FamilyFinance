export { };
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Pay = require('../models/Pay');
const User = require('../models/User');
const findSixMonthSummaryByUserId = require('./findSixMonthSummaryByUserId');

// 支出加载实现
router.get('/', ensureAuth, (req, res, next) => {
    try {
        Pay.find({ user: req.user._id }).sort({ day: -1 }).then((results) => {
            let pays = results.map(result => {
                const date = new Date(result.day);
                return {
                    id: result._id,
                    value: `${result.value}`,
                    day: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
                    time: result.time
                };
            });
            res.render('pay', {
                userName: req.user.name,
                userId: req.user._id,
                pays: pays
            });
            
        });
    } catch (err) { 
        next(err);
    }
});

// 近6个月支出查询实现
router.get('/query/summary', ensureAuth, async (req, res) => {
     let result = await findSixMonthSummaryByUserId(req.user._id, Pay);
    res.send(result);
});

// 添加支出记录界面加载
router.get('/add', ensureAuth, (req, res) => {
    res.render('addpay', {
        userName:req.user.name,
        userId: req.user._id,
    });
});

// 添加支出记录
router.post('/add', ensureAuth, (req, res, next) => {
    let { body } = req;
    let { day } = body;
    let isoDate = new Date(day);
    let pay = new Pay({ ...body,  day:isoDate,user: req.user._id});
    pay.save(pay, (err, result) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.redirect('/pay');
        }
    });
});

// 删除支出记录
router.post('/delete', ensureAuth, (req, res,next) => {
    try {
        const payId = req.body.id;
        Pay.deleteOne({ _id: payId }).then(result => {
            res.status(200);
            res.send('');
        });
    } catch (err) { 
        console.log(err);
        next(err);
    }
});

module.exports = router;