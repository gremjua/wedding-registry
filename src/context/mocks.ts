import { Gift } from 'components/gifts/types';
import percheroNordico from 'images/gifts/percheroNordico.jpg';

const gifts: Gift[] = [
	{
		id: 1,
		name: 'Perchero nórdico',
		price: 1000,
		imageUrl: percheroNordico,
	},
	{
		id: 2,
		name: 'Perchero nórdico',
		price: 5000,
		imageUrl: percheroNordico,
	},
	{
		id: 3,
		name: 'Perchero nórdico',
		price: 11000,
		imageUrl: percheroNordico,
	},
	{
		id: 4,
		name: 'Perchero nórdico',
		price: 20000,
		imageUrl: percheroNordico,
	},
	{
		id: 5,
		name: 'Perchero nórdico',
		price: 500000,
		imageUrl: percheroNordico,
	},
];

const fetchMockItems = (): Promise<Gift[]> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(gifts);
		}, 2000);
	});

export default fetchMockItems;
