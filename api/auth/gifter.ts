import { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';

const serviceAccount = JSON.parse(
	process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (admin.apps.length === 0) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		// databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	});
}

type RequestBody = {
	uid: string;
};

export default (request: VercelRequest, response: VercelResponse): void => {
	const { uid } = request.body as RequestBody;

	admin
		.auth()
		.createCustomToken(uid)
		.then(customToken => {
			// Send token back to client
			response.status(200).send({ data: customToken });
		})
		.catch(error => {
			response.status(500).send({ data: 'Error creating custom token', error });
		});
};
