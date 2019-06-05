import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDILYGESWBbzgXXOCB2vofXtnL7G8Eo-04",
    authDomain: "plan-szkolny.firebaseapp.com",
    databaseURL: "https://plan-szkolny.firebaseio.com",
    projectId: "plan-szkolny",
    storageBucket: "plan-szkolny.appspot.com",
    messagingSenderId: "938489121406",
    appId: "1:938489121406:web:560cf18e5a233b1b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;