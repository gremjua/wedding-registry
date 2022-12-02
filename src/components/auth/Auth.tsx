import { getAuth } from 'db';
import React, { useEffect } from 'react';

const Auth = (): JSX.Element => {
	useEffect(() => {
		getAuth()
			.signInAnonymously()
			.then(() => console.log('Signed in!'))
			.catch(error => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error(errorCode, errorMessage);
			});
	}, []);

	console.log('Signing in anonymously...');
	return <div style={{ display: 'none' }}>Auth</div>;
};

export default Auth;
