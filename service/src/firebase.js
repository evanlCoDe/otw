// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "你的 API KEY",
//   authDomain: "your-app.firebaseapp.com",
//   projectId: "your-app-id",
//   storageBucket: "your-app.appspot.com",
//   messagingSenderId: "xxx",
//   appId: "xxx",
// };

const firebaseConfig = {
    apiKey: "AIzaSyCkGBjHttfV-qdNRN_JSBybGp7TB4hGF50",
    authDomain: "otwproject-a2be9.firebaseapp.com",
    projectId: "otwproject-a2be9",
    storageBucket: "otwproject-a2be9.firebasestorage.app",
    messagingSenderId: "394582314375",
    appId: "1:394582314375:web:bc0389145f65f6e4929722",
    measurementId: "G-JW63N4DQEZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
