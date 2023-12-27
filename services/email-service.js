const mongoose = require("mongoose");
const EmailDto = require("../dtos/email-dto");
const EmailModel = require("../models/email-model");
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.connection.db;

class EmailService {
    async getInboxes(recipientEmail, limit, skip) {
        return await EmailModel.find({ recipientEmail }).sort({ date: -1 }).skip(skip).limit(limit);
    }

    async getEmailById(id) {
        const emailData = await EmailModel.findOne({ _id: id });
        if (!emailData) {
            throw ApiError.BadRequestError('Incorrect email');
        }
        const gfs = new Grid(mongoose.connection.db, mongoose.mongo).files;
        gfs.find().toArray((err, file) => {
            if (!err) {
                emailData.file = file;
            } else {
                console.error(err);
            }
        });
        const emailDto = new EmailDto(emailData);
        return emailDto;
    }

    async sendEmail(description, title, recipientEmail, senderEmail, file) {
        const newEmail = await EmailModel.create({ description, title, recipientEmail, senderEmail, date: Date.now() })
        const emailDto = new EmailDto(newEmail);
        return emailDto;
    }
}

module.exports = new EmailService;