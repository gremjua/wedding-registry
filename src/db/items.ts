import { Gift } from 'components/gifts/types';
import { getFireStore } from 'db';
import { fetchMockItems } from './mocks';

const fetchItemsDB = (coupleId: string): Promise<Gift[]> => {
	if (process.env.REACT_APP_USE_MOCKS) return fetchMockItems(coupleId);
	const db = getFireStore();
	const items = db.collection(`couples/${coupleId}/items`);
	return items
		.get()
		.then(querySnapshot => {
			if (querySnapshot.size === 0) {
				console.log('No results!');
			}
			return querySnapshot.docs.map(
				doc =>
					({
						...doc.data(),
						id: doc.id,
					} as Gift)
			);
		})
		.catch(error => {
			throw new Error(`Error getting items from firestore: ${error}`);
		});
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const migrateItems = () => {
	const db = getFireStore();
	const items = db.collection('items');
	return items
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(doc => {
				db.collection('couples/rccEJ3hVyV2nxnJ9AMCk/items').doc().set(doc.data());
			});
		})
		.catch(error => {
			throw new Error(`Error getting items from firestore: ${error}`);
		});
};

export default fetchItemsDB;
