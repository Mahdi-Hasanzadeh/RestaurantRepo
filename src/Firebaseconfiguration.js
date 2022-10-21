// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnFYseUaObucLHRcU3KjJM0GDkcD_yC8U",
  authDomain: "restaurantfirebase-37b81.firebaseapp.com",
  projectId: "restaurantfirebase-37b81",
  storageBucket: "restaurantfirebase-37b81.appspot.com",
  messagingSenderId: "481938463542",
  appId: "1:481938463542:web:ace3ecf36eebf3dcdc3197",
  measurementId: "G-ETJQHCN83F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
//const analytics = getAnalytics(app);
