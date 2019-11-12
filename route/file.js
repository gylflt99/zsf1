const express=require('express');
const router= express.Router();
const multer= require('multer');
var storage = multer.diskStorage({
	destination: function(req,file,cb) {
    // 指定文件路径
    // console.log(req);
		cb(null, './public/me/tx');
	},
	filename: function(req, file, cb) {
    // 指定文件名
    //文件名重复覆盖
    // 后缀名发生改变
    // console.log('----',file);
    let exts=file.originalname.split('.');
    let ext=exts[exts.length-1];
    let tmpname=(new Date()).getTime()+parseInt(Math.random()*9999)
		cb(null, `${tmpname}.${ext}`);
	}
});
var upload = multer({
	storage: storage
});


router.post('/upload/timg',upload.array("file",20),(req,res)=>{
  var uid=req.session.uid;
  if(!uid){
    
  }
  // console.log(req.files);
  let img=req.files;
  let types=['jpg','jpeg','png','gif'] //允许上传的数据类型
  let url=[];
  for(var i=0;i<img.length;i++){
    var tmpType=img[i].mimetype.split('/')[1];
    // console.log(tmpType);
    if(img.size>1048576){
      return  res.send({err:-1,msg:'尺寸大于1MB禁止上传'})
    }else if(types.indexOf(tmpType)==-1){
      return  res.send({err:-2,msg:'图片类型错误'})
    }else{
      let urlArr=`me/tx/${img[i].filename}`;
      url.push(urlArr);
    }
  }
  if(url==""){
    res.send({err:0,msg:'无图片'})
    return;
  }else{
    console.log(url);
    res.send({err:1,msg:'ok',img:url});
  }
})

module.exports=router;