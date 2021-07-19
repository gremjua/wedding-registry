import { Gift } from 'components/gifts/types';
import React, { createContext, useState } from 'react';
// import { fetchItems as getDbItems } from '../firebase/getItems';
import { fetchMockItems } from './mocks';

type GiftItemsContextProps = {
	getItems: () => Gift[];
	fetchItems: () => Promise<void>;
	isLoading: boolean;
	setIsLoading: (status: boolean) => void;
};

export const GiftItemsContext = createContext({} as GiftItemsContextProps);

export const GiftItemsProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const [items, setItems] = useState<Gift[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const getItems = () => items;
	// fetch items from DB or mock items
	const doFetchItems: () => Promise<Gift[]> = fetchMockItems;
	// process.env.USE_MOCKS ? getMockItems : getDbItems;
	const fetchItems = () => doFetchItems().then(gifts => setItems(gifts));

	return (
		<GiftItemsContext.Provider
			value={{ getItems, fetchItems, setIsLoading, isLoading }}
		>
			{children}
		</GiftItemsContext.Provider>
	);
};
