const currenciesToLocale = {
	AR$: 'es-ar',
};

export const numberToPriceString = (
	price: number,
	currency: keyof typeof currenciesToLocale
): string =>
	`${currency} ${price.toLocaleString(currenciesToLocale[currency])}`;

export const priceStringToNumber = (astring: string): number =>
	parseFloat(astring.split(' ')[1].replace('.', '').replace(' ', ''));
