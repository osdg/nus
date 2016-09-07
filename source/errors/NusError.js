/**
 * Created by plter on 9/7/16.
 */

class NusError extends Error {

    constructor(message, id) {
        super(message, id);
    }
}

module.exports = NusError;