import firebase from "firebase";

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export {db};
