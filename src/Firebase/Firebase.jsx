import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyB20DRZoLibMAs58-DCDy5TxqaFMg-cBJU",
  authDomain: "talentmeet-86e99.firebaseapp.com",
  projectId: "talentmeet-86e99",
  storageBucket: "talentmeet-86e99.appspot.com",
  messagingSenderId: "501601935481",
  appId: "1:501601935481:web:e2c9be635e963b218bb4a8",
  measurementId: "G-NBKXVZJPV3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);
