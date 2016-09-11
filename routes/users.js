var express = require('express');
var router = express.Router();
const Config = require("../source/db/Config");

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get("/register", (req, res)=> {
    Promise.all([Config.getSiteTitle(req)]).then(result=> {
        res.render("users/register", {title: result[0]});
    });
});

module.exports = router;
