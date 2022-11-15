import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyChofva0PMV2kFMnfcwN7Cx1dX2NCk5LNc",
  authDomain: "devlinks-34b27.firebaseapp.com",
  projectId: "devlinks-34b27",
  storageBucket: "devlinks-34b27.appspot.com",
  messagingSenderId: "483567377275",
  appId: "1:483567377275:web:f435d0b7dedf247a08fbde",
  measurementId: "G-JFV48GT99H"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db, auth};
