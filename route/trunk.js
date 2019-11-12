// 商城-导航按钮-列表页
const express = require('express');
const pool = require("./pool");
const router = express.Router();
const yjson=require("../yy.json");
// var goods=yjson.goods;
router.get("/",(req,res)=>{
    //接收商城按钮传过来的导航按钮id，来查询相对应的数据
    var sql="SELECT * FROM reduction";
    pool.query(sql,[],(err,result)=>{
        // console.log(result);
        if(err) throw err;
        if(result.length >0){
            res.send({code:1,msg:"查询成功",data:result})
        }
    })

})
router.get("/goods",(req,res)=>{
    res.send({yjson});
})
router.get("/queryOne",(req,res)=>{
    var resall={
        details:"",
        dImg:"",
    };
    var lid=req.query.lid;
    Promise.all([
        //查询商品相关信息
        new Promise((reslove,reject)=>{
            var sql="SELECT * FROM reduction where Tid=?";
            pool.query(sql,[lid],(err,result)=>{
                if(err) throw err;
                if(result.length >0){
                    resall.details=result;
                    reslove();
                }
            })
        }),
        //查询商品对应的图片信息
        new Promise((resolve,reject)=>{
            var sql="SELECT * FROM reduction_img where Tid=?";
            pool.query(sql,[lid],(err,result)=>{
                // console.log(result);
                if(err) throw err;
                if(result.length >0){
                    resall.dImg=result;
                    resolve();
                }
            })
        })
    ]).then(()=>{
        res.send({code:1,msg:"查询成功",data:resall});
    })
})
module.exports = router;