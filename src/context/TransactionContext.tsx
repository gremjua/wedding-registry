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
	storeTransaction: (
		transaction: Transaction,
		coupleId: string
	) => Promise<string>;
	fetchTransaction: (
		transactionId: string,
		coupleId: string
	) => Promise<DBTransaction>;
	approveTransaction: (
		transactionId: string,
		coupleId: string
	) => Promise<boolean>;
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

	const storeTransaction = (t: Transaction, coupleId: string): Promise<string> =>
		process.env.REACT_APP_USE_MOCKS
			? storeMockTransaction(t)
			: storeTransactionDB(t, coupleId);

	const fetchTransaction = (
		transactionId: string,
		coupleId: string
	): Promise<DBTransaction> =>
		process.env.REACT_APP_USE_MOCKS
			? fetchMockTransaction(transactionId)
			: fetchTransactionDB(transactionId, coupleId);

	const updateTransaction = (
		t: DBTransaction,
		coupleId: string
	): Promise<boolean> =>
		process.env.REACT_APP_USE_MOCKS
			? updateMockTransaction(t)
			: updateTransactionDB(t, coupleId);

	const approveTransaction = (
		transactionId: string,
		coupleId: string
	): Promise<boolean> =>
		fetchTransaction(transactionId, coupleId)
			.then(t => {
				const approvedTransaction: DBTransaction = { ...t, status: 'success' };
				return updateTransaction(approvedTransaction, coupleId);
			})
			.catch(_error => false);

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
