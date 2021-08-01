import { Transaction } from 'context/TransactionContext';

export type EmailData = {
	from: string;
	to: string;
	content: string;
};

const buildEmail = (transaction: Transaction, id: string): EmailData => {
	const from = 'pretzels@gmail.com';
	const { email: to } = transaction;
	const content = `&#127881; ¡Confirmaste tu regalo a través de Pretzels! &#127881;\n
    Ahora solo tenés que hacer la transferencia por un monto de $${transaction.amount.toLocaleString(
					'es-ar'
				)} a la cuenta de Juan y Sol:\n
                \tCBU: 0720169788000001382190\n
                \tAlias de CBU: VOLCAN.JARDIN.ABRIL\n\n
    Después subí el comprobante en este link: ${
					process.env.VERCEL_URL
				}/upload/${id}`;
	return { from, to, content };
};

export const sendEmail = async (
	transaction: Transaction,
	id: string,
	url = `${process.env.REACT_APP_API_URL}/api/email`
): Promise<JSON> => {
	const data = buildEmail(transaction, id);
	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data), // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
};
