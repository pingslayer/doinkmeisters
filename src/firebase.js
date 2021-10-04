import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const firestore = app.firestore();
export const database = {
  mediaAndEntertainment: firestore.collection("media_and_entertainment"),
  gamersHub: firestore.collection("gamers_hub"),
  coffeeBreaks: firestore.collection("coffee_breaks"),
  dopeTech: firestore.collection("dope_tech"),
  fashionAndHealth: firestore.collection("fashion_and_health"),
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const storage = app.storage();
export const auth = app.auth();
export default app;
