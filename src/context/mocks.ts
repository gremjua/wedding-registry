import { Gift } from 'components/gifts/types';
import { DBTransaction, Transaction } from './TransactionContext';
import { DBCouple } from './CoupleContext';

const percheroNordico = '/images/gifts/percheroNordico.jpg';
const gifts: Gift[] = [
	{
		id: '1',
		name: 'Perchero nórdico',
		price: 1000,
		imageUrl: percheroNordico,
	},
	{
		id: '2',
		name: 'Perchero nórdico',
		price: 5000,
		imageUrl: percheroNordico,
	},
	{
		id: '3',
		name: 'Perchero nórdico',
		price: 11000,
		imageUrl: percheroNordico,
	},
	{
		id: '4',
		name: 'Perchero nórdico',
		price: 20000,
		imageUrl: percheroNordico,
	},
	{
		id: '5',
		name: 'Perchero nórdico',
		price: 500000,
		imageUrl: percheroNordico,
	},
];

const couple: DBCouple = {
	id: 'testId',
	slug: 'testSlug',
	title: 'Test 1 and Test 2',
	headerImgUrl: '/images/juanYSol.jpg',
	email: 'test@gmail.com',
	bank: {
		alias: 'test.alias',
		cbu: '000022229999',
		name: 'Test Bank',
	},
	mp: true,
};

export const fetchMockItems = (): Promise<Gift[]> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(gifts);
		}, 2000);
	});

export const storeMockTransaction = (
	transaction: Transaction
): Promise<string> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve('this-is-a-test-transaction-id');
		}, 2000);
	});

const testDBTransaction: DBTransaction = {
	id: 'test-id',
	buyerName: 'Test buyer name',
	tag: 'Test tag',
	email: 'test@test.com',
	amount: 500333,
	status: 'pending',
};

export const fetchMockTransaction = (id: string): Promise<DBTransaction> =>
	// const { id: tid, status, ...t } = testTransaction;
	new Promise(resolve => {
		setTimeout(() => {
			resolve(testDBTransaction);
		}, 2000);
	});

export const updateMockTransaction = (t: DBTransaction): Promise<boolean> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, 2000);
	});

export const fetchMockCoupleBySlug = (slug: string): Promise<DBCouple> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(couple);
		}, 2000);
	});
