import { DBCouple, Couple } from 'context/CoupleContext';
import { getFireStore } from 'db';
import { fetchMockCoupleBySlug } from './mocks';

// eslint-disable-next-line import/prefer-default-export
export const fetchCoupleBySlugDB = (slug: string): Promise<DBCouple> => {
	if (process.env.REACT_APP_USE_MOCKS) return fetchMockCoupleBySlug(slug);

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
