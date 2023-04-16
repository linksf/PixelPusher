// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import {
  where,
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  query,
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

  const getFrameUrls = async (name, blobs) => {
    console.log(blobs);
    const frameUrls = [];
    for (let i = 0; i < blobs.length; i++) {
      const blob = blobs[i];
      const storageRef = ref(storage, `previews/${name}/${i}.png`);
      const metadata = { contentType: "image/png" };
      uploadBytes(storageRef, blob, metadata)
        .then((snapshot) => {
          getDownloadURL(storageRef);
        })
        .then((url) => {
          console.log(url);
          frameUrls.push(url);
        });
    }
    return frameUrls;
  };

  const checkName = async (name, attempt = 0) => {
    const q = query(userFramesCollection, where("name", "==", name));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) return name;
    else return checkName(name + `_${attempt + 1}`, attempt + 1);
  };

  const putFrames = async ({ frames, palette, name, config }) => {
    const { scale, width, height } = config;
    const urls = [];
    const fileName = await checkName(name);
    for (let [i, frame] of Object.entries(frames)) {
      const storageReference = ref(storage, `frames/${fileName}/${i}.png`);
      const canvas = document.createElement("canvas");
      canvas.width = width * 4;
      canvas.height = height * 4;
      const ctx = canvas.getContext("2d");
      for (let j = 0; j < frame.length; j++) {
        const { col, row } = getColRowFromIndex(j, width);
        const index = frame[j];
        ctx.fillStyle = index < 0 ? "rgba(0,0,0,0)" : palette[index];
        ctx.fillRect(col * 4, row * 4, 4, 4);
      }
      const dUrl = canvas.toDataURL("image/png");
      await uploadString(storageReference, dUrl, "data_url");
      const url = await getDownloadURL(storageReference);
      urls.push(url);
      console.log(url);
    }
    console.log(urls);
    saveFrames({ frames, name: fileName, palette, urls });
  };

  const getColRowFromIndex = (index, width) => {
    const col = index % width;
    const row = Math.floor(index / width);
    return { col, row };
  };

  const saveFrames = async ({ frames, name, palette, urls }) => {
    const data = { frames, name, palette, urls };
    setDoc(doc(db, `userFrames/${name}`), data)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  // const saveFrames = async (frames, name, palette) => {
  //   const framesCollectionRef = collection(db, "frames");
  //   const frames = []

  // }

  const loadFramesArray = async () => {
    console.log("Loading frame objects");
    const framesCollectionRef = collection(db, "userFrames");
    const dataArray = [];
    const querySnapshot = await getDocs(framesCollectionRef);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const framesArray = frameObjectsArrayToFramesArray(data.frames);
      data.frames = framesArray
      dataArray.push(data);
      console.dir(dataArray);
    });
    return dataArray;
  };

  const frameObjectsArrayToFramesArray = (frameObjectsArray) => {
    const framesArray = new Array(frameObjectsArray.length);
    for (let [i, frame] of Object.entries(frameObjectsArray)) {
      framesArray[i] = frame;
    }
    return framesArray;
  };

  const value = { putFrames, app, analytics, db, saveFrames, loadFramesArray };
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}
