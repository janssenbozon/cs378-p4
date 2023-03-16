// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANWP7hTa8M7EXc4M9oJQLCXAOFEyk6nXA",
  authDomain: "cs378-p4-24182.firebaseapp.com",
  projectId: "cs378-p4-24182",
  storageBucket: "cs378-p4-24182.appspot.com",
  messagingSenderId: "192897771392",
  appId: "1:192897771392:web:9abd04af4d8e6516f0c365"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();