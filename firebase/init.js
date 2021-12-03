import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA1j6-7YW-9MqT2qODjDHwq1hKLYNKL0CU",
    authDomain: "bb-bicitrobiggan.firebaseapp.com",
    databaseURL: "https://bb-bicitrobiggan-default-rtdb.firebaseio.com",
    projectId: "bb-bicitrobiggan",
    storageBucket: "bb-bicitrobiggan.appspot.com",
    messagingSenderId: "529605338874",
    appId: "1:529605338874:web:8c8a1fc7784b2b85bc8b43"
  };
export default function firebaseInit(){
  if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
  }
}