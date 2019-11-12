const express = require('express');
const pool = require("./pool");
const router = express.Router();
//功能一:商城-限时优惠-列表路由
router.get("/shoplist",(req,res)=>{
    //根据传过来的参数来决定查询几条数据
    var pag=req.query.pag;
    var sum=req.query.sum;
    //如果参数为空，就设置一个默认值
    if(!pag){pag=1}
    if(!sum){sum=4}
    //计算从第几条开始查询
    sum=parseInt(sum);
    var off=(pag-1)*sum;
    var sql="SELECT * FROM reduction LIMIT ?,?";
    //执行sql语句
    pool.query(sql,[off,sum],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:1,msg:"查询成功",data:result})
        }else{
            res.send({code:0,msg:"查询失败"})
        }
    })
})
module.exports = router;