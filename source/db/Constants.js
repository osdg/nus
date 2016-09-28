/**
 * Created by plter on 9/28/16.
 */

const Constants = {
    DB_HOST: "localhost",
    DB_PORT: 3306,
    DB_USER: "root",
    DB_PASSWORD: "",
    DB_NAME: "nus",

    get mysqlConnectString() {
        return `mysql://${this.DB_USER}:${this.DB_PASSWORD}@${this.DB_HOST}:${this.DB_PORT}/${this.DB_NAME}`;
    },
};

module.exports = Constants;