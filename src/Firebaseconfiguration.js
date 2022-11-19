// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4gj_R6eSZhRME2XvPIyy610ins6MYjq4",
  authDomain: "restaurant-1db1b.firebaseapp.com",
  projectId: "restaurant-1db1b",
  storageBucket: "restaurant-1db1b.appspot.com",
  messagingSenderId: "360587024758",
  appId: "1:360587024758:web:50582663044ada12c3c257",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
