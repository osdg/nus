/**
 * Created by plter on 9/29/16.
 */

const NusError = require("../../errors/NusError");

class UserError extends NusError {

    constructor(message, id) {
        super(message, id);
    }
}

module.exports = UserError;