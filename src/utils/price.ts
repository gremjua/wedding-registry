const currenciesToLocale = {
	AR$: 'es-ar',
};

const numberToPriceString = (
	price: number,
	currency: keyof typeof currenciesToLocale
): string =>
	`${currency} ${price.toLocaleString(currenciesToLocale[currency])}`;

export default numberToPriceString;
