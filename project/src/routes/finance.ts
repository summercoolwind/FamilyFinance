export { };
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Finance = require('../models/Finance');
const FinanceType = require('../models/FinanceType');

// 理财界面加载实现
router.get('/', ensureAuth, (req, res, next) => {
    // TODO  聚合查询
    Finance.aggregate([
        { $match: { user: mongoose.Types.ObjectId(req.user._id) } }
    ], (err, results) => {
        if (err) {
            next(err);
        } else {
            FinanceType.find((tErr, tResults) => {
                if (tErr) {
                    next(tErr);
                    return;
                }
                 let typeResults = {};
                 tResults.forEach(tResult => {
                    typeResults[tResult._id] = tResult.typeName;
                 });
                 let finances = results.map(result => {
                    return {
                            name: result.name,
                            value: `${result.value}`,
                            startDay: result.startDay,
                            continueDay: String(result.continueDay),
                            financeType: typeResults[result.financeType]
                        };
                    });
                    res.render('finance', {
                        userName: req.user.name,
                        userId: req.user._id,
                        finances: finances
                    });
            });
        }
    });
});

// 用户界面加载实现
router.get('/query', ensureAuth, async (req, res) => {
    let Finances = await Finance.find({ user: req.user._id }).lean();
    res.send(Finances);
});

// TODO  查询全部理财数据
router.get('/query/summary', ensureAuth, async (req, res) => {
    let finances = await Finance.find({ user: req.user._id }).lean();
    res.send(finances);
});

// 添加用户
router.get('/add', ensureAuth, (req, res, next) => {
    try {
        FinanceType.find().lean().then(results => {
            console.log(JSON.stringify(results));
            res.render('addfinance', {
                userName: req.user.name,
                userId: req.user._id,
                financeTypes: results
            });
        });
    } catch (err) { 
        console.log(err);
        next(err);
    }
});

// 添加用户
router.post('/add', ensureAuth, (req, res, next) => {
    let { body } = req;
    let finance = new Finance({ ...body,  user: req.user._id});
    finance.save(finance, (err, result) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.redirect('/finance');
        }
    });
});

// 更新用户信息目前没有使用，更新后需要刷新登录信息里的用户信息
router.post('/delete', ensureAuth, (req, res) => {
    
});

module.exports = router;