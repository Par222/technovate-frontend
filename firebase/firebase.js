// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBou5FWNzdAja0Eau4S227IP-diFh24EYU",
  authDomain: "miniproject-testpal.firebaseapp.com",
  projectId: "miniproject-testpal",
  storageBucket: "miniproject-testpal.appspot.com",
  messagingSenderId: "539587688968",
  appId: "1:539587688968:web:d2f16aa3b757788a8c2fbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)