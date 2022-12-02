import { VercelRequest, VercelResponse } from '@vercel/node';
// import * as admin from 'firebase-admin';

const serviceAccount = JSON.parse(
	process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

// if (admin.apps.length === 0) {
// 	admin.initializeApp({
// 		credential: admin.credential.cert(serviceAccount),
// 		// databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
// 	});
// }

type RequestBody = {
	uid: string;
};

/**
 * Auth API - Gifter
 * @summary This endpoint should not be needed because we are going to use anonymous users.
 * It would normally get a UID, such as email, and return a JWT, which can then be used in the firebase client for auth.
 * @param {VercelRequest} request
 * @param {VercelResponse} response
 * @returns {void}
 */
export default (request: VercelRequest, response: VercelResponse): void => {
	// const { uid } = request.body as RequestBody;

	// admin
	// 	.auth()
	// 	.createCustomToken(uid)
	// 	.then(customToken => {
	// Send token back to client
	const customToken = '1234';
	response.status(200).send({ data: customToken });
	// })
	// .catch(error => {
	// 	response.status(500).send({ data: 'Error creating custom token', error });
	// });
};
