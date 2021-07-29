export type Gift = {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
};

export type Filter = {
	min: number;
	max: number;
};

export type GiftKind = 'money' | 'cart';
