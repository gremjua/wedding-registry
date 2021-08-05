import { DBTransaction, Transaction } from 'context/TransactionContext';
import { getFireStore, getTimestamp } from 'db';

export const storeTransactionDB = (
	newTransaction: Transaction,
	coupleId: string
): Promise<string> => {
	const db = getFireStore();
	const transactions = db.collection(`couples/${coupleId}/transactions`);
	const actualTransaction = {
		...newTransaction,
		status: 'pending',
		timestamp: getTimestamp(),
	};
	return transactions.add(actualTransaction).then(({ id }) => id);
};

export const fetchTransactionDB = (
	transactionId: string,
	coupleId: string
): Promise<DBTransaction> => {
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
