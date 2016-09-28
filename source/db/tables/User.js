/**
 * Created by plter on 9/28/16.
 */


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
    }

};

module.exports = User;