const { validationResult } = require("express-validator");
const emailService = require("../services/email-service");

class EmailController {
    async getInboxes(req, res, next){      
        try {
            const {email} = req.params;
            const {limit = 10, skip = 0} = req.query;
            const emails = await emailService.getInboxes(email, limit, skip);
            return res.json(emails);
        } catch (error) {
            next(error);
        }
    }
    async getEmailById(req, res, next){
        try {
            const {id} = req.params;
            const email = await emailService.getEmailById(id);
            return res.json(email);
        } catch (error) {9
            next(error);
        }
    }
    async sendEmail(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequestError('Validation error', errors.array()))
            }
            const {title, description, recipientEmail, senderEmail} = req.body;
            const file = req.file;
            const email = await emailService.sendEmail(description, title, recipientEmail, senderEmail, file);
            return res.json(email);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new EmailController;