import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCLfdE04fNEludenCwZbCY2rIc-b2E_wQc",
  authDomain: "perfect-trader-a5a4b.firebaseapp.com",
  projectId: "perfect-trader-a5a4b",
  storageBucket: "perfect-trader-a5a4b.appspot.com",
  messagingSenderId: "166395549078",
  appId: "1:166395549078:web:9c9508319b5d4d3835f9b7",
  measurementId: "G-Q8L1SVH3GR"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db }; 