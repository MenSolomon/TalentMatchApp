import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7mJJBQt4rKK_98Wya21stWahgvjWKSLk",
  authDomain: "talentmeet-58ebc.firebaseapp.com",
  projectId: "talentmeet-58ebc",
  storageBucket: "talentmeet-58ebc.appspot.com",
  messagingSenderId: "116903961578",
  appId: "1:116903961578:web:4c1119a068bd793eed0893",
  measurementId: "G-Z25QK1784F",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
