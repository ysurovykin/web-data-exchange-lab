const {Schema, model} = require('mongoose');

const EmailSchema = new Schema({
    senderEmail: {type: String, required: true},
    recipientEmail: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now()},
})

module.exports = model('Email', EmailSchema);