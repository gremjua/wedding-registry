import { fetchCoupleBySlugDB } from 'db/couples';
import React, { createContext, useState } from 'react';

export type Bank = {
	name: string;
	alias: string;
	cbu: string;
};

export type Couple = {
	slug: string;
	title: string;
	headerImgUrl: string;
	email: string;
	bank: Bank;
	mp: boolean; // TODO: contain MP credentials perhaps
};

export type DBCouple = Couple & {
	id: string;
};

type CoupleContextProps = {
	getCouple: () => DBCouple | undefined;
	setCouple: (couple: DBCouple) => void;
	fetchCoupleBySlug: (slug: string) => Promise<DBCouple>;
};

export const CoupleContext = createContext({} as CoupleContextProps);

export const CoupleProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const [couple, setCouple] = useState<DBCouple>();

	const getCouple = () => couple;

	// TODO: add mocks
	const fetchCoupleBySlug = (slug: string) => fetchCoupleBySlugDB(slug);

	return (
		<CoupleContext.Provider
			value={{
				getCouple,
				setCouple,
				fetchCoupleBySlug,
			}}
		>
			{children}
		</CoupleContext.Provider>
	);
};
