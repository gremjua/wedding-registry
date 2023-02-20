/* eslint-disable */

const __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const nodemailer_1 = require('nodemailer');
const mailgen_1 = __importDefault(require('mailgen'));

const cdnUrl = 'https://cdn.jsdelivr.net/gh/gremjua/wedding-registry/public';
const buildEmailForGifter = data => {
	const { from, to, couple, transaction, transactionId } = data;
	const mailGenerator = new mailgen_1.default({
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
			title: '¡Confirmaste tu regalo!',
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
					color: '#000000',
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
	const html = mailGenerator.generate(email);
	const subject = `🎉 Confirmaste tu regalo para ${couple.title} 🎉 `;
	return { from, to, html, subject };
};
const buildEmailForCouple = data => {
	let _a;
	const { from, to, couple, transaction } = data;
	const { slug } = couple;
	const mailGenerator = new mailgen_1.default({
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
	const actualGifts =
		(_a = transaction.gifts) === null || _a === void 0
			? void 0
			: _a.map(gift => ({
					regalo: `${
						gift.name
					}<div style="width: 45px; height: 45px; background-size: cover; background-position: center; background-image: url('${cdnUrl}${encodeURI(
						gift.imageUrl
					)}');" title="${gift.name}"></div>`,
					precio: `AR$ ${gift.price}`,
			  }));
	const email = {
		body: {
			title: '¡Recibiste un regalo!',
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
	const html = mailGenerator.generate(email);
	const subject = '🎉 Recibiste un regalo 🎉 ';
	return { from, to, html, subject };
};
exports.default = (request, response) => {
	const emailData = request.body;
	const transporter = nodemailer_1.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.REACT_APP_EMAIL,
			pass: process.env.REACT_APP_EMAIL_PASS,
		},
	});
	let emailOptions;
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
	const mailOptions = emailOptions;
	transporter.sendMail(mailOptions, (err, _info) => {
		if (err) {
			response.status(500).send({ data: 'Error sending email' });
		} else {
			response.status(200).send({ data: 'Email sent correctly' });
		}
	});
};
