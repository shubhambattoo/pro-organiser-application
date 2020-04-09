/* eslint-disable */
import firebase from 'firebase/app';
import firestore from 'firebase/firestore';
import auth from 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_DBURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

export const firebaseApp = firebase.initializeApp(config);

// export the firestore db
export default firebaseApp.firestore();
