/**
 * Created by plter on 9/6/16.
 */

const DbError = require("../DbError");

const Config = {
    /**
     * @param req
     * @param name {String}
     * @param value {String}
     * @returns {Promise}
     */
    setValue: (req, name, value)=> {
        return new Promise((resolve, reject)=> {
            req.models.Config.find({name: name}, (err, result)=> {
                let saveValueHandler = (err)=> {
                    if (err) {
                        reject(new DbError(`Can't save value. \n${err.message}`, err));
                    } else {
                        resolve();
                    }
                };

                if (!err && result.length) {
                    result[0].save({value: value.toString()}, saveValueHandler);
                } else {
                    req.models.Config.create({name: name, value: value.toString()}, saveValueHandler);
                }
            });
        });
    },

    /**
     * @param req
     * @param name
     * @param defaultValue
     * @returns {Promise}
     */
    getValue: (req, name, defaultValue)=> {
        return new Promise((resolve)=> {
            req.models.Config.find({name: name}, function (err, result) {
                if (!err && result.length) {
                    resolve(result[0].value);
                } else {
                    resolve(defaultValue);
                }
            });
        });
    },

    setSiteTitle: (req)=> {
        return Config.setValue(req, "site_title");
    },

    getSiteTitle: (req, defaultValue)=> {
        return Config.getValue(req, "site_title", defaultValue);
    }
};


module.exports = Config;