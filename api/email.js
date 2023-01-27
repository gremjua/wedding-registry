/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
Object.defineProperty(exports, '__esModule', { value: true });
const nodemailer_1 = require('nodemailer');

exports.default = (request, response) => {
	const emailData = request.body;
	const transporter = nodemailer_1.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.REACT_APP_EMAIL,
			pass: process.env.REACT_APP_EMAIL_PASS,
		},
	});
	const mailOptions = {
		from: emailData.from,
		to: emailData.to,
		subject: emailData.subject,
		html: emailData.content,
	};
	transporter.sendMail(mailOptions, (err, _info) => {
		if (err) {
			response.status(500).send({ data: 'Error sending email' });
		} else {
			response.status(200).send({ data: 'Email sent correctly' });
		}
	});
};
