/* eslint-disable */
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

let firebaseApp;
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

// if a Firebase instance doesn't exist, create one
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(config);
}

export { firebaseApp };

// export the firestore db
export default firebaseApp.firestore();
