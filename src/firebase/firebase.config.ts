import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArhRocN9prBGAXHPxqM57jn81qtN2xwqY",
  authDomain: "royaleducation-909e9.firebaseapp.com",
  projectId: "royaleducation-909e9",
  storageBucket: "royaleducation-909e9.appspot.com",
  messagingSenderId: "630495065020",
  appId: "1:630495065020:web:a8541d397fdc02ccad71b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const fireConfig = {
  auth,
  googleProvider,
  facebookProvider,
};
