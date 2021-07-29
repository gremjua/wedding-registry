import { DBTransaction, Transaction } from 'context/TransactionContext';
import { getFireStore, getTimestamp } from 'db';

export const storeTransactionDB = (
	newTransaction: Transaction
): Promise<string> => {
	const db = getFireStore();
	const transactions = db.collection('transactions');
	const actualTransaction = {
		...newTransaction,
		status: 'pending',
		timestamp: getTimestamp(),
	};
	return transactions.add(actualTransaction).then(({ id }) => id);
};

export const fetchTransactionDB = (id: string): Promise<DBTransaction> => {
	const db = getFireStore();
	const transactionRef = db.collection('transactions').doc(id);
	return transactionRef
		.get()
		.then(doc => ({ ...doc.data(), id: doc.id } as DBTransaction));
};

export const updateTransactionDB = (
	transaction: DBTransaction
): Promise<boolean> => {
	const { id, ...actualTransaction } = transaction; // remove ID
	const db = getFireStore();
	const transactionRef = db.collection('transactions').doc(id);
	return transactionRef
		.update({ ...actualTransaction })
		.then(() => true)
		.catch(() => false);
};
