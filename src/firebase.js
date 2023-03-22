// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuT2NxivheUWUXPP2Cwgy4v1wH2UuQcqw",
  authDomain: "pixelpusher-2ce21.firebaseapp.com",
  projectId: "pixelpusher-2ce21",
  storageBucket: "pixelpusher-2ce21.appspot.com",
  messagingSenderId: "418776668200",
  appId: "1:418776668200:web:7b65a4efc0df8f24f43d1d",
  measurementId: "G-G62Q4C8YQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);