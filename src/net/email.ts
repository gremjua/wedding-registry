import { Couple } from 'context/CoupleContext';
import { Transaction } from 'context/TransactionContext';

export type EmailData = {
	from: string;
	to: string;
	type: 'GIFTER' | 'COUPLE';
	transaction: Transaction;
	transactionId?: string;
	couple: Couple;
};

export const sendEmailToGifter = async (
	transaction: Transaction,
	transactionId: string,
	couple: Couple,
	url = `${process.env.REACT_APP_URL}/api/email`
): Promise<JSON> => {
	const from = process.env.REACT_APP_EMAIL || '';
	const { email: to } = transaction;
	const type: EmailData['type'] = 'GIFTER';
	// const data = buildEmailForGifter(transaction, id, couple);
	const data: EmailData = { from, to, type, transaction, transactionId, couple };
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

export const sendEmailToCouple = async (
	transaction: Transaction,
	couple: Couple,
	url = `${process.env.REACT_APP_URL}/api/email`
): Promise<JSON> => {
	const from = process.env.REACT_APP_EMAIL || '';
	const to = transaction.email;
	const type: EmailData['type'] = 'COUPLE';
	// const data = buildEmailForCouple(transaction, couple);
	const data: EmailData = { from, to, type, transaction, couple };
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
		body: JSON.stringify(data),
	});
	return response.json();
};
