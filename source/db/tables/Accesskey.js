/**
 * Created by plter on 9/29/16.
 */


const PasswordTool = require("../../tools/PasswordTool");
const DbError = require("../DbError");

const AccessKey = {

    /**
     *
     * @param req
     * @param userId
     * @param {Number} periodOfValidity Period of validity in milliseconds
     */
    createAccessKey: function (req, userId, periodOfValidity) {
        return new Promise((resolve, reject)=> {
            var currentDate = new Date();

            req.models.AccessKey.create({
                user_id: userId,
                access_key: PasswordTool.makeAccessKey(),
                creation_date: currentDate,
                expired_date: new Date(currentDate.getTime() + periodOfValidity)
            }, function (err, result) {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new DbError(err.message, err, 20001));
                }
            });
        });
    }
};


module.exports = AccessKey;