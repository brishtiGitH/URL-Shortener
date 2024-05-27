const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true
    },
    visitHistory: [{ timestamp: Number }]
}, { timestamps: true })

const URL = new mongoose.model('urls', urlSchema)
module.exports = URL;