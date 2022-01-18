import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDU8dTeu8A-UXutk45fXDo7P5oWeHlXNBU" ,
  authDomain: "chat-exchange-app.firebaseapp.com" ,
  databaseURL : "http://chat-exchange-app.firebase.io.com",
  projectId: "chat-exchange-app",
  storageBucket: "chat-exchange-app.appspot.com" ,
  messagingSenderId:"207496549430",
  appId:"1:207496549430:web:932e0c84018626b332b497" ,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,db , storage};