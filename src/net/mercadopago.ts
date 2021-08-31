/* eslint-disable camelcase */
import { Gift } from 'components/gifts/types';
import { DBCouple } from 'context/CoupleContext';
import { Transaction } from 'context/TransactionContext';

const PREFERENCE_URL = 'https://api.mercadopago.com/checkout/preferences';
const PAYMENT_URL = 'https://api.mercadopago.com/v1/payments';

// {
//     id: 1,
//     title: 'A title',
//     imageUrl: madera1,
//     price: 100,
//     featured: false,
//     stock: 5,
//     initial: 1,
//     description: new LoremIpsum().generateParagraphs(2),
//     categoryId: 1,
// },

/**
 * Create an order in Mercado Pago payment platform
 * @param couple couple information, including ID and slug that identify the couple in the DB
 * @param transaction Transaction with tag, amount, buyer name, and email
 * @returns URL in which the checkout form is available
 */
export const createMercadoPagoOrder = (
	couple: DBCouple,
	transaction: Transaction
): Promise<string> => {
	const preference = {
		items: [
			{
				title: `Regalo para ${couple.title}`,
				description: JSON.stringify({ transaction, coupleId: couple.id }),
				unit_price: transaction.amount,
				currency_id: 'ARS',
				quantity: 1,
			},
		],
		back_urls: {
			success: `${process.env.REACT_APP_URL}/${couple.slug}/thanks`,
		},
		auto_return: 'approved',
		notification_url: `${process.env.REACT_APP_URL}/api/mercadopago/payment`,
		// notification_url: 'https://en9ogrevk3joars.m.pipedream.net',
	};
	return fetch(PREFERENCE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.REACT_APP_MP_ACCESS_TOKEN}`,
		},
		body: JSON.stringify(preference),
	})
		.then(response => response.json().then(json => json.init_point))
		.catch(error => {
			console.error(error);
		});
};

/**
 * Create an order in Mercado Pago payment platform
 * @param cart gift cart
 * @returns URL in which the checkout form is available
 */
export const createMercadoPagoOrderWithGifts = (
	coupleSlug: string,
	cart: Gift[]
): Promise<string> => {
	const preference = {
		items: cart.map(gift => ({
			title: gift.name,
			description: gift.name,
			picture_url: gift.imageUrl,
			unit_price: gift.price,
			currency_id: 'ARS',
			quantity: 1,
		})),
		back_urls: {
			success: `${process.env.REACT_APP_URL}/${coupleSlug}/thanks`,
		},
		auto_return: 'approved',
	};
	return fetch(PREFERENCE_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.REACT_APP_MP_ACCESS_TOKEN}`,
		},
		body: JSON.stringify(preference),
	})
		.then(response => response.json().then(json => json.init_point))
		.catch(error => {
			console.error(error);
		});
};

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

export const getPayment = (paymentId: string): Promise<Payment> =>
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

export const isPaymentApproved = async (
	paymentId: string
): Promise<boolean> => {
	try {
		const { status } = await getPayment(paymentId);
		return status === 'approved';
	} catch (error) {
		throw new Error(`Error getting payment information: ${error}`);
	}
};
