/**
 * Created by plter on 9/7/16.
 */

class NusError extends Error {

    constructor(message, id) {
        super(message);

        this._id = id;
    }

    get id() {
        return this._id;
    }
}

module.exports = NusError;