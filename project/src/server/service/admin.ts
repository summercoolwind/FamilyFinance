
import Express from 'express';
const admin = Express.Router();
const User = require('../dao/model/User')
import Utils from './Utils'
import CustomRequest from "./CustomRequest";

//admin请求后台验证

admin.use( (req:CustomRequest,res,next) =>{
    if(req.session.userInfo){
        next()
    }else{
        res.send(Utils.responseClient(res,200,1,'身份信息已过期，请重新登录'));
    }
});

// 增加
admin.post('/add',(req:CustomRequest,res)=>{
    console.log("add:" + req);
});
// 删除
admin.post('/delete',(req:CustomRequest,res)=>{
    console.log("delete:" + req);
});
// 更新
admin.post('/update',(req:CustomRequest,res)=>{
    console.log("update:" + req);
});
// 查询列表
admin.get('/query',(req:CustomRequest,res)=>{
    let query = req.query;
    let pageNum = parseInt(query['pageNum'] as string); 
    let skip =(pageNum - 1)<0?0:( pageNum -1)*10;
    let list : string[]= [];
    let responseData = {
        total:0,
        list
    };
    User.count()
        .then((count:number)=>{
            responseData.total = count;
            User.find(null,'_id username type password',{skip:skip,limit:10})
                .then((result:string[])=>{
                    responseData.list = result;
                    Utils.responseClient(res,200,0,'',responseData)
                })
                .catch((err:object)=>{
                    Utils.responseClient(res);
                })
        });
});
// 查询某一个的详情
admin.get('/queryDetail',(req:CustomRequest,res)=>{
    console.log("queryDetail:" + req);
});

module.exports  = admin;