import React, { createContext, useState } from 'react';
import {
	fetchMockTransaction,
	storeMockTransaction,
	updateMockTransaction,
} from './mocks';

export type TransactionStatus = 'pending' | 'success' | 'failure';

export type Transaction = {
	tag: string;
	buyerName: string;
	email: string;
	amount: number;
};

export type DBTransaction = Transaction & {
	id: string;
	status: TransactionStatus;
};

type TransactionContextProps = {
	getTransaction: () => Transaction | undefined;
	clearTransaction: () => void;
	setTransaction: (transaction: Transaction) => void;
	storeTransaction: (transaction: Transaction) => Promise<string>;
	fetchTransaction: (id: string) => Promise<DBTransaction>;
	approveTransaction: (transactionId: string) => Promise<boolean>;
};

export const TransactionContext = createContext({} as TransactionContextProps);

export const TransactionProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const [transaction, setTransaction] = useState<Transaction>();

	const getTransaction = () => transaction;

	const clearTransaction = () => setTransaction(undefined);

	const storeTransaction = (t: Transaction): Promise<string> => {
		// TODO: fix return type according to firebase doc ID
		console.log(transaction); // TODO: store in DB with status
		return storeMockTransaction(t);
		// MAYBE: store with 'status' = 'pending' ?
	};

	const fetchTransaction = (id: string): Promise<DBTransaction> =>
		fetchMockTransaction(id);

	const updateTransaction = (t: DBTransaction): Promise<boolean> =>
		updateMockTransaction(t);

	const approveTransaction = (transactionId: string): Promise<boolean> =>
		fetchTransaction(transactionId)
			.then(t => {
				const approvedTransaction: DBTransaction = { ...t, status: 'success' };
				return updateTransaction(approvedTransaction);
			})
			.catch(error => false);

	return (
		<TransactionContext.Provider
			value={{
				getTransaction,
				clearTransaction,
				setTransaction,
				storeTransaction,
				fetchTransaction,
				approveTransaction,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};
