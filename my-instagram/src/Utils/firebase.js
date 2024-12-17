import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAs-g1dRiDOTiEjBA7BFfrq3hdFwYx0RaI",
  authDomain: "my-instagram-146f9.firebaseapp.com",
  projectId: "my-instagram-146f9",
  storageBucket: "my-instagram-146f9.firebasestorage.app",
  messagingSenderId: "572987733134",
  appId: "1:572987733134:web:d057dc923c4c2c1e6bc5df",
  measurementId: "G-JKT8ND44NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
