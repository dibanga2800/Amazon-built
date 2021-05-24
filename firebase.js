import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDrhP8zvOMRYAOOEcBUVk116GCLLR2PF4Q",
  authDomain: "amzn-clone-fc221.firebaseapp.com",
  projectId: "amzn-clone-fc221",
  storageBucket: "amzn-clone-fc221.appspot.com",
  messagingSenderId: "768186258036",
  appId: "1:768186258036:web:5b0865855920ac1d06f721",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
