const mysql=require("mysql")      //引入数据库模块

var pool= mysql.createPool({
    host: "127.0.0.1", //数据库地址
    user: "root", //数据库用户名
    password: "", //数据库密码
    port: 3306, //数据库端口
    database: "zsf", //库名
    connectionLimit: 15 //15连接
})
//     host: "w.rdc.sae.sina.com.cn", //数据库地址
//     user: "45024yw4y5", //数据库用户名
//     password: "mk5lxi3hlyw3ix53x242hljh5hxi440h31k2l3zj", //数据库密码
//     port: 3306, //数据库端口
//     database: "app_zsf0328", //库名
//     connectionLimit: 20 //15连接
// })
module.exports=pool;  //导出结果