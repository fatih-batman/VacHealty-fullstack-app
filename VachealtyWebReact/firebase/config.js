import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";



export const firebaseConfig = {
    apiKey: "AIzaSyA_lt2IYzS5a7f1XJfg31C6Dg9Hh4rpBGc",
    authDomain: "vachealtyapp.firebaseapp.com",
    projectId: "vachealtyapp",
    storageBucket: "vachealtyapp.appspot.com",
    messagingSenderId: "32599434451",
    appId: "1:32599434451:web:061a9e88ae4c3974d62026",
    measurementId: "G-FQXGJ5S4RV"
};


const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const fireStore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
