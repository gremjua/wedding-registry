import { Gift } from 'components/gifts/types';
// TODO: move DB types to db directory
import { DBTransaction, Transaction } from 'context/TransactionContext';
import { DBCouple } from 'context/CoupleContext';

const DELAY = parseInt(process.env.DELAY || '10', 10);
const percheroNordico = '/images/gifts/percheroNordico.jpg';
const gifts: Gift[] = [
	{
		id: '1',
		name: 'Perchero nórdico 1',
		price: 1000,
		imageUrl: percheroNordico,
	},
	{
		id: '2',
		name: 'Perchero nórdico 2',
		price: 5000,
		imageUrl: percheroNordico,
	},
	{
		id: '3',
		name: 'Perchero nórdico 3',
		price: 11000,
		imageUrl: percheroNordico,
	},
	{
		id: '4',
		name: 'Perchero nórdico 4',
		price: 20000,
		imageUrl: percheroNordico,
	},
	{
		id: '5',
		name: 'Perchero nórdico 5',
		price: 500000,
		imageUrl: percheroNordico,
	},
];

const couple: DBCouple = {
	id: 'testId',
	slug: 'testCouple',
	title: 'Test 1 and Test 2',
	headerImgUrl: '/images/juanYSol.jpg',
	email: 'test@gmail.com',
	bank: {
		alias: 'test.alias',
		cbu: '000022229999',
		name: 'Test Bank',
	},
	mp: true,
	rsvpUrl: 'http://google.com',
};

const testDBTransaction: DBTransaction = {
	id: 'test-id',
	buyerName: 'Test buyer name',
	tag: 'Test tag',
	email: 'test@test.com',
	amount: 500333,
	status: 'pending',
};

export const fetchMockItems = (_coupleSlug: string): Promise<Gift[]> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(gifts);
		}, DELAY);
	});

export const storeMockTransaction = (
	_transaction: Transaction
): Promise<string> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve('this-is-a-test-transaction-id');
		}, DELAY);
	});

export const fetchMockTransaction = (_id: string): Promise<DBTransaction> =>
	// const { id: tid, status, ...t } = testTransaction;
	new Promise(resolve => {
		setTimeout(() => {
			resolve(testDBTransaction);
		}, DELAY);
	});

export const updateMockTransaction = (_t: DBTransaction): Promise<boolean> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, DELAY);
	});

export const fetchMockCoupleBySlug = (_slug: string): Promise<DBCouple> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(couple);
		}, DELAY);
	});
