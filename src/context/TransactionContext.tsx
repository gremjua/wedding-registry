import {
	fetchTransactionDB,
	storeTransactionDB,
	updateTransactionDB,
} from 'db/transactions';
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
	timestamp?: Date;
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

	const storeTransaction = (t: Transaction): Promise<string> =>
		process.env.REACT_APP_USE_MOCKS
			? storeMockTransaction(t)
			: storeTransactionDB(t);

	const fetchTransaction = (id: string): Promise<DBTransaction> =>
		process.env.REACT_APP_USE_MOCKS
			? fetchMockTransaction(id)
			: fetchTransactionDB(id);

	const updateTransaction = (t: DBTransaction): Promise<boolean> =>
		process.env.REACT_APP_USE_MOCKS
			? updateMockTransaction(t)
			: updateTransactionDB(t);

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
