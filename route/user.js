const express=require('express');
const pool=require("./pool");
const router=express.Router();

router.get("/userLogin",(req,res)=>{
    var uphone=req.query.uphone;
    var upwd=req.query.upwd;
    console.log(uphone,upwd);
    var sql1="select * from zsf_user where uphone=? and upwd =?";
    var sql4="select uid from zsf_user where uphone=?";
    var sql2="insert into zsf_user (uphone,upwd) values (?,?)";
    var sql3="select uid from zsf_user where uphone=? and upwd =?";
    pool.query(sql1,[uphone,upwd],(err,result)=>{
        var uid;
        if(err) throw err;
        if(result.length>0){
            uid=req.session.uid = result[0].uid;
            res.send({code:1,msg:"登录成功",uid:uid});
            return;
        }else{
            pool.query(sql4,[uphone],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    res.send({code:0,msg:"用户密码错误"});
                    return;
                }else{
                    pool.query(sql2,[uphone,upwd],(err,result)=>{
                        if(err) throw err;
                        if(result.affectedRows>0){
                            pool.query(sql3,[uphone,upwd],(err,result)=>{
                                if(err) throw err;
                                if(result.length>0){
                                    uid=req.session.uid = result[0].uid;
                                    res.send({code:1,msg:"添加成功",uid:uid});
                                }
                            })
                        }else{
                            res.send({code:-1,msg:"添加失败"});
                        }
                    })
                }
            })
            
        }
    })
})

router.get("/me",(req,res)=>{
    var uid=req.query.uid;
    var sql="select * from zsf_user where uid=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send(result);
        }
    })
})

router.get("/us_upt",(req,res)=>{
    var uid=parseInt(req.query.uid);
    var utitle=req.query.utitle;
    var uvalue=req.query.uvalue;
    // console.log(uid,utitle,uvalue);
    var sql;
    switch(utitle){
        case "uphone":
            sql="update zsf_user set uphone=? where uid=?";
            break;
        case "uemail":
            sql="update zsf_user set uemail=? where uid=?";
            break;
        case "utb":
            sql="update zsf_user set utb=? where uid=?";
            break;
        case "uwx":
            sql="update zsf_user set uwx=? where uid=?";
            break;
        case "uqq":
            sql="update zsf_user set uqq=? where uid=?";
            break;
        case "uwb":
            sql="update zsf_user set uwb=? where uid=?";
            break;
        case "uheadportrait":
            sql="update zsf_user set uheadportrait=? where uid=?";
            break;
        case "uname":
            sql="update zsf_user set uname=? where uid=?";
            break;
        case "usex":
            sql="update zsf_user set usex=? where uid=?";
            break;
        case "ubirthday":
            sql="update zsf_user set usex=? where uid=?";
            break;
        case "uborn":
            sql="update zsf_user set usex=? where uid=?";
            break; 
        case "upslst":
            sql="update zsf_user set upslst=? where uid=?";
            break;         
    }
    // console.log(sql);
    pool.query(sql,[uvalue,uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({ code: 1, msg: '修改成功',result})
        }else{
            res.send({ code: -1, msg: '修改失败'})
        }
    })
})
module.exports=router;