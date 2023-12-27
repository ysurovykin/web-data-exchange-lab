const Router = require('express').Router;
const router = new Router();
const multer = require('multer');
const emailController = require('../controllers/email-controller');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

const storage = new GridFsStorage({
  url: process.env.DB_URL,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads'
    };
  }
});

const upload = multer({ storage });

/**
 * @swagger
 * components:
 *   schemas:
 *     Email:
 *       type: object
 *       required:
 *         - senderEmail
 *         - recipientEmail
 *         - title
 *         - description
 *       properties:
 *         senderEmail:
 *           type: string
 *           description: The sender email
 *         recipientEmail:
 *           type: string
 *           description: The recipient email
 *         title:
 *           type: string
 *           description: The email title
 *         description:
 *           type: string
 *           description: The email description
 *         file:
 *           type: string
 *           format: binary
 *           description: The file to upload.
 *       example:
 *         id: id
 *         senderEmail: sender@gmail.com
 *         recipientEmail: recipient@gmail.com
 *         title: Hello
 *         description: Hello there!
 */

/**
 * @swagger 
 * tags:
 *   name: Emails
 *   description: The email managing API
 */

/**
 * @swagger 
 * /api/send:
 *   post:
 *     summary: Send email
 *     tags: [Emails]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: Email sent
 *       500:
 *         description: Server error
 */
router.post('/send', upload.single('file'), emailController.sendEmail)

/**
 * @swagger 
 * /api/emails/{email}:
 *   get:
 *     summary: Get all user emails
 *     tags: [Emails]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user email to recieve emails for
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         default: 10
 *         required: false
 *         description: The limit amount of emails to
 *       - in: query
 *         name: skip
 *         schema:
 *           type: number
 *         default: 0
 *         required: false
 *         description: The amount of emails to skip
 *     responses:
 *       200:
 *         description: Email
 *         schema:
 *           $ref: '#/components/schemas/Email'
 *       500:
 *         description: Server error
 */
router.get('/emails/:email', emailController.getInboxes);


/**
 * @swagger 
 * /api/email/{id}:
 *   get:
 *     summary: Send email
 *     tags: [Emails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The email id
 *     responses:
 *       200:
 *         description: Email sent.
 *       500:
 *         description: Server error
 */
router.get('/email/:id', emailController.getEmailById);

module.exports = router;