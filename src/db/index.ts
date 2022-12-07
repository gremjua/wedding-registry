import firebase from 'firebase/app';
import 'firebase/firestore';

require('firebase/auth');

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: 'wedding-registry-cead1.firebaseapp.com',
	projectId: 'wedding-registry-cead1',
	storageBucket: 'wedding-registry-cead1.appspot.com',
	messagingSenderId: '51135760403',
	appId: '1:51135760403:web:aa06f616d2fd9f7c8fd7e6',
	measurementId: 'G-PYH3SEB7Q6',
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const getFireBase = (): firebase.app.App => app;

export const getFireStore = (): firebase.firestore.Firestore =>
	firebase.firestore(app);

export const getTimestamp = (): firebase.firestore.Timestamp =>
	firebase.firestore.Timestamp.fromDate(new Date());

export const getAuth = (): firebase.auth.Auth => app.auth();
