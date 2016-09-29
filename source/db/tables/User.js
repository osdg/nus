/**
 * Created by plter on 9/28/16.
 */


const UserError = require("./UserError");
const DbError = require("../DbError");
const AccessKey = require("./Accesskey");

const User = {

    addUser: function (req, user, encryptedPassword) {
        return new Promise((resolve, reject)=> {
            req.models.User.create({
                name: user,
                pass: encryptedPassword,
                register_time: new Date(),
                gender: 1
            }, (error, result)=> {
                if (!error) {
                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    },

    login: function (req, user, encryptedPassword) {

        return new Promise((resolve, reject)=> {
            req.models.User.find({name: user}, (err, result)=> {
                if (!err) {
                    if (result && result.length > 0) {
                        let userFound = result[0];

                        if (userFound.pass == encryptedPassword) {
                            resolve(userFound);
                        } else {
                            reject(new UserError("Password error", 10004));
                        }
                    } else {
                        reject(new UserError("No such user", 10003));
                    }
                } else {
                    reject(new DbError("Db error", err, 20001));
                }
            });
        }).then(function (user) {
            return AccessKey.createAccessKey(req, user.id, 1000 * 60 * 60 * 24 * 7);
        });
    }

};

module.exports = User;