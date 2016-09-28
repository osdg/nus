/**
 * Created by plter on 9/28/16.
 */

const crypto = require("crypto");

const PasswordTool = {

    makePassword: function (password) {
        return this.md5(this.md5(password) + password);
    },

    md5: function (value) {
        return crypto.createHash("md5").update(value).digest("hex");
    }
};

module.exports = PasswordTool;