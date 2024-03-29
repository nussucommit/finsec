import firebase from 'firebase/app';
import 'firebase/auth'; // for authentication
import 'firebase/firestore'; // for cloud firestore
import 'firebase/storage'; // for storage
// import 'firebase/database';    // for realtime database
// import 'firebase/messaging';   // for cloud messaging
// import 'firebase/functions';   // for cloud functions

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
firebase.initializeApp(config);

export const { auth } = firebase;
export const firestore = firebase.firestore();
// export const storage = firebase.storage().ref();
// export const db = firebase.database();
