import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBDzU20bP8iluQo_dEXYMIrKitMcX-Hgyw",
  authDomain: "bg-brokers.firebaseapp.com",
  projectId: "bg-brokers",
  storageBucket: "bg-brokers.appspot.com",
  messagingSenderId: "859912755462",
  appId: "1:859912755462:web:4a14fb2548e657ded0a687",
  measurementId: "G-52QMQ1Q889"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);