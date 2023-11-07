// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0lTxYQL2G7OGU6eRBPLLJK-sjprYLHVg",
  authDomain: "fir-chatapp-2ab57.firebaseapp.com",
  projectId: "fir-chatapp-2ab57",
  storageBucket: "fir-chatapp-2ab57.appspot.com",
  messagingSenderId: "756938883635",
  appId: "1:756938883635:web:0b08631c6b289f45a11946",
  measurementId: "G-FWN5Y0SGDL",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
export const db = getFirestore();
