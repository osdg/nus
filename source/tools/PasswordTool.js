/**
 * Created by plter on 9/28/16.
 */

const crypto = require("crypto");
const uuid = require("uuid");

const PasswordTool = {

    makePassword: function (password) {
        return this.md5(this.md5(password) + password);
    },

    md5: function (value) {
        return crypto.createHash("md5").update(value).digest("hex");
    },

    uuidv1: function () {
        return uuid.v1();
    },

    uuidv4: function () {
        return uuid.v4();
    },

    makeAccessKey(){
        return this.md5(this.uuidv4());
    }
};

module.exports = PasswordTool;