// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDIQVicV-TZCo8su4kkKP-1afgK4Xc8Odw",
  authDomain: "notesdesk-1a257.firebaseapp.com",
  projectId: "notesdesk-1a257",
  storageBucket: "notesdesk-1a257.appspot.com",
  messagingSenderId: "176230902705",
  appId: "1:176230902705:web:13084d789550bcd49e6b90",
  measurementId: "G-9ZKE25XPD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
const analytics = getAnalytics(app);