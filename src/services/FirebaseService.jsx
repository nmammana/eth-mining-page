// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwo5tgXqnGgpWdNdL3tzovARe-60pjcz0",
  authDomain: "cms-crypto.firebaseapp.com",
  projectId: "cms-crypto",
  storageBucket: "cms-crypto.appspot.com",
  messagingSenderId: "468464863613",
  appId: "1:468464863613:web:ed594395f24e13ab286414",
  measurementId: "G-XJ00RB830B"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;