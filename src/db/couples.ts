import { DBCouple, Couple } from 'context/CoupleContext';
import { getFireStore } from 'db';

export const getCoupleIdBySlug = (
	slug: string
): Promise<string | undefined> => {
	const db = getFireStore();
	const couples = db.collection('couples');
	return couples
		.get()
		.then(querySnapshot => {
			if (querySnapshot.size === 0) {
				console.log('No results!');
			}
			return querySnapshot.docs.find(
				doc => (doc.data() as { slug: string }).slug === slug
			)?.id;
		})
		.catch(error => {
			throw new Error(`Error getting couples from firestore: ${error}`);
		});
};

export const fetchCoupleBySlugDB = (slug: string): Promise<DBCouple> => {
	const db = getFireStore();
	const couples = db.collection('couples');
	return couples
		.get()
		.then(querySnapshot => {
			if (querySnapshot.size === 0) {
				console.log('No results!');
			}
			const couple = querySnapshot.docs.find(
				doc => (doc.data() as Couple).slug === slug
			);
			return { ...couple?.data(), id: couple?.id } as DBCouple;
		})
		.catch(error => {
			throw new Error(`Error getting couples from firestore: ${error}`);
		});
};
