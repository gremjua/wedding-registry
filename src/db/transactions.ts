import { DBTransaction, Transaction } from 'context/TransactionContext';
import { getFireStore, getTimestamp } from 'db';
import {
	fetchMockTransaction,
	storeMockTransaction,
	updateMockTransaction,
} from './mocks';

export const storeTransactionDB = (
	newTransaction: Transaction,
	coupleId: string,
	status = 'pending'
): Promise<string> => {
	if (process.env.REACT_APP_USE_MOCKS)
		return storeMockTransaction(newTransaction);
	const db = getFireStore();
	const transactions = db.collection(`couples/${coupleId}/transactions`);
	const actualTransaction = {
		...newTransaction,
		status,
		timestamp: getTimestamp(),
	};
	return transactions.add(actualTransaction).then(({ id }) => id);
};

export const fetchTransactionDB = (
	transactionId: string,
	coupleId: string
): Promise<DBTransaction> => {
	if (process.env.REACT_APP_USE_MOCKS)
		return fetchMockTransaction(transactionId);
	const db = getFireStore();
	const transactionRef = db
		.collection(`couples/${coupleId}/transactions`)
		.doc(transactionId);
	return transactionRef
		.get()
		.then(doc => ({ ...doc.data(), id: doc.id } as DBTransaction));
};

export const updateTransactionDB = (
	transaction: DBTransaction,
	coupleId: string
): Promise<boolean> => {
	if (process.env.REACT_APP_USE_MOCKS) return updateMockTransaction(transaction);
	const { id, ...actualTransaction } = transaction; // remove ID
	const db = getFireStore();
	const transactionRef = db
		.collection(`couples/${coupleId}/transactions`)
		.doc(id);
	return transactionRef
		.update({ ...actualTransaction })
		.then(() => true)
		.catch(() => false);
};
