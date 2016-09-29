/**
 * Created by plter on 9/28/16.
 */

const User = require("../source/db/tables/User");
const PasswordTool = require("../source/tools/PasswordTool");

function checkUserNameAndPassword(req, res, next) {
    if (req.body.user) {
        if (req.body.password) {
            next();
        } else {
            res.json({code: 10002, message: "Need input password"});
        }
    } else {
        res.json({code: 10001, message: "Need input user name"});
    }
}


module.exports = function (router) {
    router.post("/user/register", checkUserNameAndPassword);
    router.post("/user/register", (req, res)=> {
        User.addUser(req,
            req.body.user,
            PasswordTool.makePassword(req.body.password)
        ).then(result=> {
            res.json({code: 1, message: "OK"});
        }).catch(error=> {
            console.log(error);

            switch (error.errno) {
                case 1062:
                    res.json({code: 1062, message: error.message});
                    break;
                default:
                    res.json({code: 0, message: "Unknown error"});
                    break;
            }
        });
    });


    router.post("/user/login", checkUserNameAndPassword);
    router.post("/user/login", (req, res)=> {
        User.login(req,
            req.body.user,
            PasswordTool.makePassword(req.body.password)
        ).then(result=> {
            res.json({code: 1, message: "OK", accessKey: result});
        }).catch(error=> {
            res.json({code: error.id, message: error.message});
        });
    });
};