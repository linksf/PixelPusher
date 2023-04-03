// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";
import { useState, useEffect, useContext, createContext } from "react";

//create context
export const FirebaseContext = createContext();

//create provider
export default function FirebaseProvider({ children }) {
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
    measurementId: "G-G62Q4C8YQJ",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const userFramesCollection = collection(db, "userFrames");

  const saveFrames = async ({ frames, name, palette, blob }) => {
    const storageRef = ref(storage, `previews/${name}.png`);
    const metadata = { contentType: "image/png" };
    uploadBytes(storageRef, blob, metadata)
      .then((snapshot) => {
        console.log(snapshot)
        return getDownloadURL(storageRef);
      })
      .then((url) => {
        console.log(url)
        const data = { frames, name, palette, snapshop: url };
        addDoc(userFramesCollection, data)
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      });
  };
  // const saveFrames = async (frames, name, palette) => {
  //   const framesCollectionRef = collection(db, "frames");
  //   const frames = []

  // }
  const value = { app, analytics, db, saveFrames };
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
