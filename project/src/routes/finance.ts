export { };
const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Finance = require('../models/Finance');
const FinanceType = require('../models/FinanceType');

// 用户界面加载实现
router.get('/', ensureAuth, (req, res, next) => {
    FinanceType.find((tErr, tResults) => {
        if (tErr) {
            console.log(tErr);
            next(tErr);
            return;
        }
        Finance.find({ user: req.user._id }, (err, results) => {
            if (err) {
                next(err);
            } else {
                let finances = results.map(result => {
                    return {
                        name: result.name,
                        value: `${result.value}`,
                        startDay: result.startDay,
                        continueDay: String(result.continueDay),
                        financeType: result.financeType
                    };
                });
                let financeTypes = tResults.map(result => {
                    return {name:result.typeName,id:result._id};
                })
                console.log(JSON.stringify(financeTypes));
                res.render('finance', {
                    userName: req.user.name,
                    userId: req.user._id,
                    finances: finances,
                    financeTypes:financeTypes
                });
            }
        });
    });
});

// 用户界面加载实现
router.get('/query', ensureAuth, async (req, res) => {
    let Finances = await Finance.find({ user: req.user._id }).lean();
    res.send(Finances);
});

// 用户界面加载实现
router.get('/query/summary', ensureAuth, async (req, res) => {
    let finances = await Finance.find({ user: req.user._id }).lean();
    res.send(finances);
});

// 添加用户
router.get('/add', ensureAuth, (req, res, next) => {
    FinanceType.find((err, results) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        let financeTypes = results.map(result => {
            return { name: result.typeName, id: result._id };
        });
        res.render('addfinance', {
            userName:req.user.name,
            userId: req.user._id,
            financeTypes
        });
    });
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