var express = require('express');
var router = express.Router();
var Config = require("../source/db/Config");

/* GET home page. */
router.get('/', function (req, res, next) {
    Config.getSiteTitle(req).then(function (result) {
        res.render('index', {title: result});
    }).catch((err)=> {
        res.send("Error");
    });
});

module.exports = router;
