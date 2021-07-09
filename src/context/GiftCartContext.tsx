import { Gift } from 'components/gifts/types';
import React, { createContext, useState } from 'react';

type GiftCartContextProps = {
	getGiftCart: () => Gift[];
	addGiftToCart: (gift: Gift) => void;
	removeGiftFromCart: (gift: Gift) => void;
	clearCart: () => void;
	isInCart: (gift: Gift) => boolean;
	getTotals: () => { totalQuantity: number; totalPrice: number };
};

export const GiftCartContext = createContext({} as GiftCartContextProps);

export const GiftCartProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const [giftCart, setGiftCart] = useState<Gift[]>([]);
	const getGiftCart = () => [...giftCart];
	const isInCart = (gift: Gift) =>
		giftCart.findIndex(el => el.id === gift.id) !== -1;
	const addGiftToCart = (gift: Gift) => {
		if (!isInCart(gift)) {
			setGiftCart([...giftCart, gift]);
		}
	};
	const removeGiftFromCart = (gift: Gift) => {
		setGiftCart([...giftCart.filter(el => el.id !== gift.id)]);
	};
	const clearCart = () => setGiftCart([]);
	const getTotals = () => ({
		totalQuantity: giftCart.length,
		totalPrice: giftCart.map(gift => gift.price).reduce((a, b) => a + b, 0),
	});

	return (
		<GiftCartContext.Provider
			value={{
				getGiftCart,
				addGiftToCart,
				removeGiftFromCart,
				clearCart,
				isInCart,
				getTotals,
			}}
		>
			{children}
		</GiftCartContext.Provider>
	);
};
