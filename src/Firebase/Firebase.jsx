import { initializeApp } from "firebase/app";
import {
  enablePersistentCacheIndexAutoCreation,
  getFirestore,
} from "firebase/firestore";
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

export const app = initializeApp(firebaseConfig);

export const auth = app ? getAuth() : null;
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
export const functions = getFunctions(app);

// const auth = app ? getAuth(app) : null;

// if (auth) {
//   // Use auth object here
//   enablePersistentCacheIndexAutoCreation(db).catch((err) => {
//     if (err.code === "failed-precondition") {
//       // Multiple tabs open, persistence can only be enabled in one
//       console.error("Persistence failed");
//     } else if (err.code === "unimplemented") {
//       // The browser doesn't support persistence
//       console.error("Persistence is not supported");
//     }
//   });
// } else {
//   // Handle initialization errors (optional)
// }

// enablePersistentCacheIndexAutoCreation(db).catch((err) => {
//   if (err.code === "failed-precondition") {
//     // Multiple tabs open, persistence can only be enabled in one
//     console.error("Persistence failed");
//   } else if (err.code === "unimplemented") {
//     // The browser doesn't support persistence
//     console.error("Persistence is not supported");
//   }
// });
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);
