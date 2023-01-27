/* eslint-disable */
const __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(resolve => {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))((resolve, reject) => {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator.throw(value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
const __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
const node_fetch_1 = __importDefault(require('node-fetch'));
const db_1 = require('../../src/db');

const PAYMENT_URL = 'https://api.mercadopago.com/v1/payments';
const getPayment = paymentId =>
	node_fetch_1
		.default(`${PAYMENT_URL}/${paymentId}`, {
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
const storeTransactionDB = (newTransaction, coupleId, status = 'pending') => {
	const db = db_1.getFireStore();
	const transactions = db.collection(`couples/${coupleId}/transactions`);
	const actualTransaction = {
		...newTransaction,
		status,
		timestamp: db_1.getTimestamp(),
	};
	return transactions.add(actualTransaction).then(({ id }) => id);
};
const allowCors = fn => (req, res) =>
	__awaiter(void 0, void 0, void 0, function* () {
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
	});
const handler = (request, response) =>
	__awaiter(void 0, void 0, void 0, function* () {
		try {
			const payload = request.body;
			if (payload.action === 'payment.created') {
				getPayment(payload.data.id)
					.then(payment => {
						const { status } = payment;
						if (status === 'approved') {
							const paymentInfo = payment.additional_info.items[0];
							const { coupleId, transaction } = JSON.parse(paymentInfo.description);
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
	});
exports.default = allowCors(handler);
