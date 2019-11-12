const express = require('express');
const pool = require("./pool");
const router = express.Router();

router.get("/showorder",(req,res)=>{
    var uid=req.query.uid;
    console.log(uid);
    var sql="select * from orderlist where userid=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,msg:"有商品订单",obj:result});
        }else{
            res.send({code:-1,msg:"无商品订单"});
        }
    })
})

router.get("/delorder",(req,res)=>{
    var uid=req.query.uid;
    var tnumber=req.query.tnumber;
    var sql="delete from orderlist where userid=? and tnumber=?";
    var sql1="select * from orderlist where userid=?";
    pool.query(sql,[uid,tnumber],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            pool.query(sql1,[uid],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    res.send({code:1,msg:"删除后重新查询成功",data:result});
                    return;
                }else{
                    res.send({code:0,msg:"没数据了"});
                    return;
                }
            })
        }else{
            res.send({code:-1,msg:"删除失败"});
            return;
        }
    })
})




router.get("/addorder",(req,res)=>{   
    var uid=parseInt(req.session.uid);   //用户id
    if(uid==undefined){ 
        res.send({code:0,msg:"未登录"});
        return;
    }
    var obj=JSON.parse(req.query.obj);
    // console.log(obj);
    //  console.log(obj);
    var lid=parseInt(obj.Tid);  //商品id
    var ddescribe=obj.TsuBtitle;    //简介 
    var timg=obj.Timg;       //图片
    var tcheck=obj.tcheck;  //规格型号
    var tcount=obj.tcount;  //数量
    var price=Number(obj.Tprice);   //金额
    var timer=new Date();
    var ordertime=timer.toLocaleDateString()+" "+timer.toLocaleTimeString();  //下单时间
    var foottime=obj.foottime.slice(0,10);
    var tnumber=Math.floor(Math.random()*999999999);
    var tstate=obj.tstate;
    console.log(lid,uid,timg,ddescribe,tcheck,tcount,price,ordertime,foottime,tnumber,tstate);
    
    // // 查询订单表中是否存在该商品，如果有，就修改商品数量+1,没有则添加一条信息
    var sql1="select tcount from orderlist where userid=? and lid=?";
    // //添加一列： 用户id  商品id 标题  简介 数量  金额  下单时间  订单号
    var sql2="insert into orderlist value(?,?,?,?,?,?,?,?,?,?,?)";
    pool.query(sql2,[lid,uid,timg,ddescribe,tcheck,tcount,price,ordertime,foottime,tnumber,tstate],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"添加成功"});
            return;
        }else{
            res.send({code:-1,msg:"添加失败"});
            return;
        }
    })
})
module.exports=router;