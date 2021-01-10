var express = require('express');
import Utils from './Utils'
import User from '../dao/model/User';
import CustomRequest from './CustomRequest'
const router = express.Router();
//  增加数据
router.post('/addDataItem', (req:CustomRequest, res) => {
    console.log("addDataItem:" + req);
    Utils.responseClient(res, 200, 2, '');
});

// 删除数据
router.post('/deleteData', (req:CustomRequest, res) => {
    console.log("deleteData:" + req);
    Utils.responseClient(res, 200, 2, '');
});

// 批量更新数据
router.post('/updateData',  (req:CustomRequest, res) =>{
    console.log("updateData:" + req);
    Utils.responseClient(res, 200, 2, '');
});

// 获取数据列表
router.get('/getAllData',  (req:CustomRequest, res)=> {
    console.log("getAllData:" + req);
    Utils.responseClient(res, 200, 2, '');
});

//获取
router.get('/getDataDetail', (req:CustomRequest, res) => {
    Utils.responseClient(res, 200, 2, '');
});

router.post('/login', (req:CustomRequest, res) => {
    let {userName, password} = req.body;
    // let {userName, password}  = req.query;
    console.log("Router login " + userName + password)
    if (!userName) {
        Utils.responseClient(res, 400, 2, '');
        return;
    }
    if (!password) {
      Utils.responseClient(res, 400, 2, '');
      return;
    }

    User.findOne({
        name:userName,
        password: password
    }).then((userInfo) => {
        console.log("find one "  + userInfo);
        if (userInfo) {
            //登录成功后设置session
            req.session.userInfo = userInfo;
            Utils.responseClient(res, 200, 0, '', userInfo);
            return;
        }
        Utils.responseClient(res, 405, 1, '');
        return;
  
    }).catch((e) => {
        console.log("find one exception"  + JSON.stringify(e));
        Utils.responseClient(res);
        return;
    });
});

//用户验证
router.get('/userInfo',function (req:CustomRequest,res) {
    if(req.session.userInfo){
        Utils.responseClient(res,200,0,'',req.session.userInfo)
    }else{
        Utils.responseClient(res,200,1,'请重新登录',req.session.userInfo)
    }
});

router.get('/logout',function (req:CustomRequest,res) {
    req.session = null;
    res.redirect('/');
});

module.exports =  router;