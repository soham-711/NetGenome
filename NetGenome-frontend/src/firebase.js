// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4ZWx-bTzOHUQ6X97mWxm3l3kGMGdX8vw",
  authDomain: "netgenome-b5d5c.firebaseapp.com",
  projectId: "netgenome-b5d5c",
  storageBucket: "netgenome-b5d5c.appspot.com",
  messagingSenderId: "355872785957",
  appId: "1:355872785957:web:42c8eb3bbaa52ef7cf61cc",
  measurementId: "G-DJR8GFJF01",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
