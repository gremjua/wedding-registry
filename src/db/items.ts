import { Gift } from 'components/gifts/types';
import { getFireStore } from 'db';

const fetchItemsDB = (coupleId: string): Promise<Gift[]> => {
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
