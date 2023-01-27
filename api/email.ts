import { VercelRequest, VercelResponse } from '@vercel/node';
import { EmailData } from 'net/email';
import { MailOptions } from 'nodemailer/lib/json-transport';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createTransport } = require('nodemailer');

export default (request: VercelRequest, response: VercelResponse): void => {
	const emailData: EmailData = request.body;

	const transporter = createTransport({
		service: 'gmail',
		auth: {
			user: process.env.REACT_APP_EMAIL,
			pass: process.env.REACT_APP_EMAIL_PASS,
		},
	});
	const mailOptions: MailOptions = {
		from: emailData.from,
		to: emailData.to,
		subject: emailData.subject,
		html: emailData.content,
	};

	transporter.sendMail(mailOptions, (err: any, _info: any) => {
		if (err) {
			response.status(500).send({ data: 'Error sending email' });
		} else {
			response.status(200).send({ data: 'Email sent correctly' });
		}
	});
};
