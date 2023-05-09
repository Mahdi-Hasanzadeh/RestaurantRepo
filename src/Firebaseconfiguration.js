import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAybExltsmymkm66JDKJZGvNHR4cd3Q4WM",
  authDomain: "restaurant-eaec6.firebaseapp.com",
  projectId: "restaurant-eaec6",
  storageBucket: "restaurant-eaec6.appspot.com",
  messagingSenderId: "700924449614",
  appId: "1:700924449614:web:a1ddc4223ea8510f8a041f",
  measurementId: "G-G2Y8YZXYY4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
