// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHM1jXQCAPn07bc7dLiFlL1FCImk-j1ts",
  authDomain: "onlinedoctor-93888.firebaseapp.com",
  projectId: "onlinedoctor-93888",
  storageBucket: "onlinedoctor-93888.firebasestorage.app",
  messagingSenderId: "940049949978",
  appId: "1:940049949978:web:f3462e10bc68df1bb478a3",
  measurementId: "G-R928NQDMFH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
