const express = require('express');
const pool = require("./pool");
const router = express.Router();
// 根据月份查询
router.get('/month', (req,res) => {
    var month = req.query.month;
    var ttype = req.query.ttype;
    var sql = 'select img_url,country from travel where suitable=? or ttype=?';
    pool.query(sql, [month,ttype], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({code:1,result})
        } else {
            res.send({code:-1})
        }
    })
})
module.exports = router;