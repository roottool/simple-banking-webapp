import firebase from 'firebase';
import config from './firebase/config';

export const badRequest = 'Bad request';
export const notFound = 'Not Found';

firebase.initializeApp(config);
export const db = firebase.firestore();
