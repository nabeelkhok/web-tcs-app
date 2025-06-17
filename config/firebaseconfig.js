// config/firebaseconfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmsgiHyTryt9AffjijcUoe2l9EiMTT414",
  authDomain: "web-tcs-app-main.firebaseapp.com",
  projectId: "web-tcs-app-main",
  storageBucket: "web-tcs-app-main.appspot.com",
  messagingSenderId: "893027850083",
  appId: "1:893027850083:web:f9bfa00958c11046e1e556"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Changed from firebaseAuth to auth
const db = getFirestore(app);

export { auth, db };  // Now exporting 'auth' instead of 'firebaseAuth'