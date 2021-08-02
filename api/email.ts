import { VercelRequest, VercelResponse } from '@vercel/node';
import { EmailData } from 'net/email';
import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';

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

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			response.status(500).send({ data: 'Error sending email' });
		} else {
			response.status(200).send({ data: 'Email sent correctly' });
		}
	});
};
