/* eslint-disable */
import firebase from 'firebase';
import firestore from 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: 'pro-organisers.firebaseapp.com',
  databaseURL: 'https://pro-organisers.firebaseio.com',
  projectId: 'pro-organisers',
  storageBucket: 'pro-organisers.appspot.com',
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.measurementId
};

const firebaseApp = firebase.initializeApp(config);

// export the firestore db
export default firebaseApp.firestore();
