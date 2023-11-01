import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmANpI3t_i6dpPS9lnG4-p3bTgtO0O1_k",
  authDomain: "cwsa-mail-tracker.firebaseapp.com",
  projectId: "cwsa-mail-tracker",
  storageBucket: "cwsa-mail-tracker.appspot.com",
  messagingSenderId: "881887505692",
  appId: "1:881887505692:web:02fa8e6eefcbfa48591ed9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
