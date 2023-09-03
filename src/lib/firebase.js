// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA__tYHvHi6mrqA-FvJYmZcGgVxfqzBfW8",
  authDomain: "shopy-33347.firebaseapp.com",
  projectId: "shopy-33347",
  storageBucket: "shopy-33347.appspot.com",
  messagingSenderId: "981058055014",
  appId: "1:981058055014:web:2ccf5b47f2426f7402b6a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
