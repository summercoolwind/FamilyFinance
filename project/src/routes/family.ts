import { resourceLimits } from "worker_threads";

export { };
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const User = require('../models/User');
const Family = require('../models/Family');
const FamilyMember = require('../models/FamilyMember');

// 默认路由实现
router.get('/', ensureAuth, (req, res) => {
    // 给家庭添加成员，根据用户查询到Family，再根据family查询member成员的userName
    Family.find({ ownerUser: req.user._id }, (err, results) => {
        if (err) {
            console.log(err);
            res.render('error/500',{
                layout:'login'
            });
        } else if (results.length > 0) {
            // 有自己创建的家庭的
            let result = results[0];
            FamilyMember.aggregate([
                { $match: {family: mongoose.Types.ObjectId(result._id)}},
                { $lookup: { from: 'Family', as: 'ownUser', localField: '_id', foreignField: 'ownerUser' } },
                { $lookup: { from: 'User', localField: 'familyUser', foreignField: '_id', as: 'users', } },
                ],
            (mErr, mResult) => {
                if (mErr) {
                    console.log(mErr);
                    res.render('error/500');
                    return;
                }
                let resultUsers = mResult.length > 0 ? mResult[0].users.map(element => {
                    return {
                        userName: element.name,
                        owner : false
                    };
                }) : [];
                resultUsers.push({userName:req.user.name, owner : true});
                res.render('family', {
                    userName:req.user.name,
                    familyName: result.name,
                    familyId: result._id,
                    isFamilyOwner: true,
                    familyMembers: resultUsers
                });
            });
        } else {
            FamilyMember.aggregate([
                { $lookup: { from: 'Family', localField: 'family', foreignField: '_id', as: 'family' } },
                { $lookup: { from: 'User', localField: 'familyUser', foreignField: '_id', as: 'users', } },
                { $match: {  'users._id': mongoose.Types.ObjectId(req.user._id) } }],
            (mErr, mResult) => {
                if (mErr) {
                    console.log(mErr);
                    res.render('error/500');
                    return;
                }
                if (mResult.length > 0) {
                    let resultUsers =  mResult[0].users.map(element => {
                        return {
                            userName: element.name,
                            owner: false
                        };
                    });
                    let family = mResult[0].family[0];
                    User.find({ id:family.ownerUser }, (uErr, uResults) => {
                        if (uErr) {
                            console.log(uErr);
                        } else if (uResults.length > 0) {
                            resultUsers.push({
                                userName: uResults[0].name,
                                owner: true
                            });
                        }
                        res.render('family', {
                            userName:req.user.name,
                            familyName: family.name,
                            familyId: family._id,
                            isFamilyOwner: false,
                            familyMembers: resultUsers
                        });
                    });                    
                } else {
                    res.render('family');
                }
            });
        }
    });
});

// 默认路由实现
router.get('/member/:id', ensureAuth, (req, res) => {
    User.aggregate([
        { $lookup: { from: 'Family', as: 'ownUser', localField: '_id', foreignField: 'ownerUser' } },
        { $match: { 'ownUser._id': { $exists: false } } } ,
        { $lookup: { from: 'FamilyMember', as: 'memberUser', localField: '_id', foreignField: 'familyUser' } },
        { $match: { 'memberUser._id': { $exists: false } } }], (err, results) => {
        if (err) {
            res.render('error/500');
            return;
        }
        res.render('familymember', {
            userName:req.user.name,
            familyId: req.params.id,
            users:results
         }); 
    });
});

// 默认路由实现
router.post('/add', ensureAuth, (req, res) => {
    let { body } = req;
    let { familyName } = body;
    let family = new Family({ name: familyName, ownerUser: req.user.id });
    Family.find({ name: familyName }, (fErr, fResults) => {
        if (fErr) {
            console.log(fErr);
            res.render('error/500');
        } else if (fResults.length > 0) {
            res.redirect('/family');
        } else {
            family.save(family, (err, result) => {
                if (err) {
                    console.log(err);
                    res.render('error/500', {
                        layout: 'login'
                    });
                } else {
                    res.redirect('/family');
                }
            });
        }
    });
});

// 默认路由实现
router.post('/addmember', ensureAuth, (req, res) => {
    // TODO  给家庭添加成员
    let { body } = req;
    let { family,familyUser } = body;
    let familyMember = new FamilyMember({family:family,familyUser:familyUser});
    familyMember.save(familyMember, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error/500');
            return;
        }
        res.redirect('/family');
    });
});

module.exports = router;