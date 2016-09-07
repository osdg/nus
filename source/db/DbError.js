/**
 * Created by plter on 9/7/16.
 */

const NusError = require("../errors/NusError");

class DbError extends NusError {

    constructor(message, relatedError, id) {
        super(message, id);

        this._relatedError = relatedError;
    }

    get relatedError() {
        return this._relatedError;
    }
}

module.exports = DbError;