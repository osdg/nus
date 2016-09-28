/**
 * Created by plter on 9/6/16.
 */

const orm = require("orm");
const Constants = require("./Constants");


function defineUserTable(db, models) {
    models.User = db.define("user", {
        id: Number,
        name: String,
        pass: String,
        email: String,
        register_time: String,
        gender: Number,
        display_name: String
    }, {
        methods: {
            getRegisterTime: function () {
                return new Date(this.register_time);
            }
        }
    });
}

function defineAccessKeyTable(db, models) {
    models.AccessKey = db.define("access_key", {
        id: Number,
        user_id: Number,
        access_key: String,
        data: String,
        creation_date: String,
        expired_date: String
    }, {
        methods: {
            getCreationDate: function () {
                return new Date(this.creation_date);
            },
            getExpiredDate: function () {
                return new Date(this.expired_date);
            }
        }
    });
}

function defineConfigTable(db, models) {
    models.Config = db.define("config", {
        id: Number,
        name: String,
        value: String
    });
}


module.exports = function () {
    return orm.express(Constants.mysqlConnectString, {
        define: function (db, models, next) {
            defineUserTable(db, models);
            defineAccessKeyTable(db, models);
            defineConfigTable(db, models);
            next();
        }
    });
};