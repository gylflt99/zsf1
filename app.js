const express=require('express');     
const querystring=require('querystring');  
const bodyParser=require('body-parser');   
const usRouter=require('./route/user.js');
const indexRouter=require('./route/index.js');
const travelRouter = require('./route/travel.js');
const shoplistRouter=require('./route/shoplist.js');
const trunkRouter=require('./route/trunk.js');
const fileRouter=require('./route/file.js');
const orderRouter=require('./route/orderlist.js');
const cors=require("cors");
const session = require("express-session");



var app = express();
app.listen(80);    //新浪云-

//解决跨域问题
app.use(cors({
    //允许程序列表
    origin: ["*"],
    credentials: true //每次请求需要验证
}))

//加载session对象
app.use(session({
    secret: "128位字符串", //安全字符串
    resave: true, //每次请求时更新数据
    saveUninitialized: true //保存初始数据
}))

app.use(bodyParser.urlencoded({extended:false}));   
app.use(express.static('./public')); 
app.use('/user',usRouter);
app.use('/index',indexRouter);
app.use('/shop',shoplistRouter);
app.use('/travel', travelRouter);
app.use('/trunk',trunkRouter);
app.use('/file',fileRouter);
app.use('/order',orderRouter);



