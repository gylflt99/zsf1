const express = require('express');
const pool = require("./pool");
const router = express.Router();
router.get('/indexlist', (req, res) => {
    var sql = 'select img_url,detail,price from index_list';
    pool.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({code:1,result})
        } else {
            res.send({code:-1})
        }
    })
})
module.exports = router;