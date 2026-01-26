import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXRdfRdBCz6q_sRsXPPKhAGSsc7HRrh64",
  authDomain: "skill-swap-fs.firebaseapp.com",
  projectId: "skill-swap-fs",
  storageBucket: "skill-swap-fs.firebasestorage.app",
  messagingSenderId: "309512641129",
  appId: "1:309512641129:web:71a10de25bea659e28a0f8",
  measurementId: "G-W3VVMDMEWN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
