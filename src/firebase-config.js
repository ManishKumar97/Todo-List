import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCQtNI3Wf71ThMtLUO6U-tygXJenvSj_R0",
  authDomain: "to-do-list-74856.firebaseapp.com",
  projectId: "to-do-list-74856",
  storageBucket: "to-do-list-74856.appspot.com",
  messagingSenderId: "593479532283",
  appId: "1:593479532283:web:ce785730e739a5d5ddfa5e",
  measurementId: "G-D06YQ5SGD4",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
export { db };
