var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('api respond with a resource');
});

require("./user")(router);

module.exports = router;
