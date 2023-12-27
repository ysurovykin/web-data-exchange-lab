module.exports = class EmailDto {
    id;
    senderEmail;
    recipientEmail;
    title;
    description;
    date;
    file;

    constructor(model){
        this.id = model.id;
        this.senderEmail = model.senderEmail;
        this.recipientEmail = model.recipientEmail;
        this.title = model.title;
        this.description = model.description;
        this.date = model.date;
        this.file = model.file;
    }
}