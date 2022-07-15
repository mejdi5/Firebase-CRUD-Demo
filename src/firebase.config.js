import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCVngyO1nLlrhM7RNQ2A_vLxIzNVPMgmD8",
  authDomain: "dulcet-nucleus-355817.firebaseapp.com",
  projectId: "dulcet-nucleus-355817",
  storageBucket: "dulcet-nucleus-355817.appspot.com",
  messagingSenderId: "457062070087",
  appId: "1:457062070087:web:837bbef878d7268e50fe62",
  measurementId: "G-Y1RPM4B0TE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);