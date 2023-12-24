// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJuW2eaoydQvxyK1rOnfwncB1CVHP5c0c",
  authDomain: "meet-mingle-702f5.firebaseapp.com",
  projectId: "meet-mingle-702f5",
  storageBucket: "meet-mingle-702f5.appspot.com",
  messagingSenderId: "447107076465",
  appId: "1:447107076465:web:36241abdce0657686766d0",
  measurementId: "G-4VTFW9W6Q2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB,"users");
export const meetingRef = collection(firebaseDB,"meetings");