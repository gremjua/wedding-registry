/* eslint-disable import/no-unresolved */
import { VercelRequest, VercelResponse } from '@vercel/node';
import { createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { EmailData } from 'net/email';
import Mailgen from 'mailgen';

const cdnUrl = 'https://cdn.jsdelivr.net/gh/gremjua/wedding-registry/public';

const buildEmailForGifter = (data: EmailData): EmailOptions => {
	const { from, to, couple, transaction, transactionId } = data;

	const mailGenerator = new Mailgen({
		theme: 'default',
		product: {
			// Appears in header & footer of e-mails
			name: 'Pretzels',
			link: `${process.env.REACT_APP_URL}/${couple.slug}`,
			// Optional product logo
			logo: `${cdnUrl}/images/pretzelsLogoSimple.png`,
			logoHeight: '80px',
		},
	});

	const email = {
		body: {
			title: '¡Confirmaste tu regalo!', // &#127881; ¡Confirmaste tu regalo! &#127881
			intro: [
				`El ID de tu regalo es: ${transactionId}`,
				`Hacé la transferencia de <b>$${transaction.amount.toLocaleString(
					'es-ar'
				)}</b> a la siguiente cuenta:`,
				'<hr style="text-align:center">',
				`<b>${couple.bank.name}</b>`,
				`<b>Número de CBU</b>: ${couple.bank.cbu}`,
				`<b>Alias de CBU</b>: ${couple.bank.alias}`,
				`<hr style="text-align:center">`,
			],
			action: {
				instructions:
					'Luego subí el comprobante haciendo click en el siguiente botón:',
				button: {
					color: '#000000', // Optional action button color
					text: 'SUBIR COMPROBANTE',
					link: `${process.env.REACT_APP_URL}/${couple.slug}/upload/${transactionId}`,
				},
			},
			goToAction: {
				text: 'SUBIR COMPROBANTE',
				link: `${process.env.REACT_APP_URL}/${couple.slug}/upload/${transactionId}`,
				description: 'Subir comprobante de tu transferencia bancaria',
			},
			outro:
				'¿Necesitás ayuda o tenés preguntas? Simplemente respondé a este e-mail y te contestaremos a la brevedad.',
			signature: false,
		},
	};

	const html: string = mailGenerator.generate(email);
	const subject = `🎉 Confirmaste tu regalo para ${couple.title} 🎉 `;
	return { from, to, html, subject };
};

const buildEmailForCouple = (data: EmailData): EmailOptions => {
	const { from, to, couple, transaction } = data;
	const { slug } = couple;

	const mailGenerator = new Mailgen({
		theme: 'default',
		product: {
			// Appears in header & footer of e-mails
			name: 'Pretzels',
			link: `${process.env.REACT_APP_URL}/${slug}`,
			// Optional product logo
			logo: `${cdnUrl}/images/pretzelsLogoSimple.png`,
			logoHeight: '80px',
		},
	});

	const actualGifts = transaction.gifts?.map(gift => ({
		regalo: `${
			gift.name
		}<div style="width: 45px; height: 45px; background-size: cover; background-position: center; background-image: url('${cdnUrl}${encodeURI(
			gift.imageUrl
		)}');" title="${gift.name}"></div>`,
		precio: `AR$ ${gift.price}`,
	}));

	const email = {
		body: {
			title: '¡Recibiste un regalo!', // &#127881; ¡Confirmaste tu regalo! &#127881
			intro: [
				`Recibiste un regalo de <b>${
					transaction.buyerName
				}</b> por un monto de <b>AR$ ${transaction.amount.toLocaleString(
					'es-ar'
				)}</b> con la siguiente dedicatoria:`,
				'<hr style="text-align:center">',
				`<b>${transaction.tag}</b>`,
				'<hr style="text-align:center">',
				...(actualGifts && actualGifts.length
					? ['Los regalos que seleccionó esta persona son los siguientes:']
					: []),
			],
			...(actualGifts && actualGifts.length
				? {
						table: {
							data: actualGifts,
							columns: {
								// Optionally, customize the column widths
								customWidth: {
									regalo: '60%',
								},
								// Optionally, change column text alignment
								customAlignment: {
									precio: 'right',
								},
							},
						},
				  }
				: {}),
			outro: [
				`Podés agradecerle enviandole un e-mail a <b>${transaction.email}</b>`,
				'¿Necesitás ayuda o tenés preguntas? Simplemente respondé a este e-mail y te contestaremos a la brevedad.',
			],
			signature: false,
		},
	};

	const html: string = mailGenerator.generate(email);
	const subject = '🎉 Recibiste un regalo 🎉 ';
	return { from, to, html, subject };
};

type EmailOptions = {
	from: string;
	to: string;
	subject: string;
	html: string;
};

export default (request: VercelRequest, response: VercelResponse): void => {
	const emailData: EmailData = request.body;

	const transporter = createTransport({
		service: 'gmail',
		auth: {
			user: process.env.REACT_APP_EMAIL,
			pass: process.env.REACT_APP_EMAIL_PASS,
		},
	});

	let emailOptions: EmailOptions;
	if (emailData.type === 'COUPLE') {
		emailOptions = buildEmailForCouple(emailData);
	} else if (emailData.type === 'GIFTER') {
		emailOptions = buildEmailForGifter(emailData);
	} else {
		response
			.status(400)
			.send({ data: 'Invalid email type. It needs to be COUPLE or GIFTER.' });
		return;
	}

	const mailOptions: MailOptions = emailOptions;

	transporter.sendMail(mailOptions, (err, _info) => {
		if (err) {
			response.status(500).send({ data: 'Error sending email' });
		} else {
			response.status(200).send({ data: 'Email sent correctly' });
		}
	});
};
