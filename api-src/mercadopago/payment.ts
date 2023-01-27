/* eslint-disable camelcase */
import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import { getFireStore, getTimestamp } from '../../src/db';
// import { storeTransactionDB } from '../../src/db/transactions';
// import { getPayment } from '../../src/net/mercadopago';
// import { Transaction } from '../../src/context/TransactionContext';

type PaymentAction = {
	action: string;
	data: {
		id: string;
	};
};

// TODO: see if we can import this --------------------------------------------------
type Transaction = {
	tag: string;
	buyerName: string;
	email: string;
	amount: number;
};

const PAYMENT_URL = 'https://api.mercadopago.com/v1/payments';

type Payment = {
	additional_info: {
		items: [
			{
				description: string;
				id: string;
				picture_url: string;
				quantity: string | number;
				title: string;
				unit_price: string | number;
			}
		];
	};
	status: string;
};

const getPayment = (paymentId: string): Promise<Payment> =>
	fetch(`${PAYMENT_URL}/${paymentId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.REACT_APP_MP_ACCESS_TOKEN}`,
		},
	})
		.then(response => response.json())
		.catch(error => {
			console.log(error);
		});

const storeTransactionDB = (
	newTransaction: Transaction,
	coupleId: string,
	status = 'pending'
): Promise<string> => {
	const db = getFireStore();
	const transactions = db.collection(`couples/${coupleId}/transactions`);
	const actualTransaction = {
		...newTransaction,
		status,
		timestamp: getTimestamp(),
	};
	return transactions.add(actualTransaction).then(({ id }) => id);
};

// ------------------------------------------------------
// ------------------------------------------------------

type Handler = (
	request: VercelRequest,
	response: VercelResponse
) => Promise<any>;

const allowCors =
	(fn: Handler) =>
	async (req: VercelRequest, res: VercelResponse): Promise<void> => {
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader('Access-Control-Allow-Origin', '*');
		// another common pattern
		// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET,OPTIONS,PATCH,DELETE,POST,PUT'
		);
		res.setHeader(
			'Access-Control-Allow-Headers',
			'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
		);
		if (req.method === 'OPTIONS') {
			return res.status(200).end();
		}
		return fn(req, res);
	};

const handler = async (
	request: VercelRequest,
	response: VercelResponse
): Promise<void> => {
	try {
		const payload: PaymentAction = request.body;
		if (payload.action === 'payment.created') {
			getPayment(payload.data.id)
				.then(payment => {
					const { status } = payment;
					if (status === 'approved') {
						const paymentInfo = payment.additional_info.items[0];
						const { coupleId, transaction } = JSON.parse(paymentInfo.description) as {
							transaction: Transaction;
							coupleId: string;
						};
						storeTransactionDB(transaction, coupleId, 'success')
							.then(id => {
								// TODO: maybe sendEmailToCouple
								response.status(200).json({ data: `Stored transaction ${id}` });
							})
							.catch(() =>
								response
									.status(500)
									.json({ data: 'Error storing successful transaction' })
							);
					} else {
						response.status(200).json({ data: 'Payment is not approved' });
					}
				})
				.catch(() => response.status(500).json({ data: 'Error getting payment' }));
		} else {
			response.status(200).json({ data: 'Not a valid payload' });
		}
	} catch (error) {
		response.status(500).json({ data: error });
	}
};

export default allowCors(handler);
