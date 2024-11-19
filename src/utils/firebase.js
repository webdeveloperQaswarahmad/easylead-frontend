// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-fe7b1.firebaseapp.com",
  projectId: "taskmanager-fe7b1",
  storageBucket: "taskmanager-fe7b1.appspot.com",
  messagingSenderId: "767735551351",
  appId: "1:767735551351:web:6ea4ca533f4fb5ab7c7d72",
  measurementId: "G-6B51N1WLXL",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
