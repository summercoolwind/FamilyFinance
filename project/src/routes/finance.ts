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
        { $match: { user: mongoose.Types.ObjectId(req.user._id) } },
        { $sort: {startDay:-1}}
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
                    const date = new Date(result.startDay);
                    return {
                            id: result._id,
                            name: result.name,
                            value: `${result.value}`,
                            startDay: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
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

// 添加理财界面首页
router.get('/add', ensureAuth, (req, res, next) => {
    try {
        FinanceType.find().lean().then(results => {
            res.render('addfinance', {
                userName: req.user.name,
                userId: req.user._id,
                financeTypes: results
            });
        });
    } catch (err) { 
        next(err);
    }
});

// 添加添加理财
router.post('/add', ensureAuth, (req, res, next) => {
    let { body } = req;
    let finance = new Finance({ ...body,  user: req.user._id});
    finance.save(finance, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.redirect('/finance');
        }
    });
});

// TODO 删除理财
router.post('/delete', ensureAuth, (req, res, next) => {
    try {
        const financeId = req.body.id;
        Finance.deleteOne({ _id: financeId }).then(result => {
            res.status(200);
            res.send('');
        });
    } catch (err) { 
        next(err);
    }
});

module.exports = router;