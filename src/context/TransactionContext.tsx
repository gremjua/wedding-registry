import React, { createContext, useState } from 'react';
import { fetchMockTransaction, storeMockTransaction } from './mocks';

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
	setTransaction: (transaction: Transaction) => void;
	storeTransaction: (transaction: Transaction) => Promise<string>;
	fetchTransaction: (id: string) => Promise<DBTransaction>;
};

export const TransactionContext = createContext({} as TransactionContextProps);

export const TransactionProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const [transaction, setTransaction] = useState<Transaction>();

	const getTransaction = () => transaction;

	const storeTransaction = (t: Transaction): Promise<string> => {
		// TODO: fix return type according to firebase doc ID
		console.log(transaction); // TODO: store in DB with status
		return storeMockTransaction(t);
		// MAYBE: store with 'status' = 'pending' ?
	};

	const fetchTransaction = (id: string): Promise<DBTransaction> =>
		fetchMockTransaction(id);

	return (
		<TransactionContext.Provider
			value={{
				getTransaction,
				setTransaction,
				storeTransaction,
				fetchTransaction,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};
