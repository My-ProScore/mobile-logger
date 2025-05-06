const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    apiEndpoint: { type: String, required: true },
    requestMetadata: { type: Object, required: true },
    responseMetadata: { type: Object, required: true }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;