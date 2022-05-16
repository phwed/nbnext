import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmca8Kg1_tngyvs7pZItj62kEbhu6O3VE",
  authDomain: "nexttutorial-ed5d2.firebaseapp.com",
  projectId: "nexttutorial-ed5d2",
  storageBucket: "nexttutorial-ed5d2.appspot.com",
  messagingSenderId: "754102530088",
  appId: "1:754102530088:web:00d78e0c122d8e7c8a451d",
  measurementId: "G-XYZ3HLXD3J",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getFirestore(app);
export const auth = getAuth(app);
