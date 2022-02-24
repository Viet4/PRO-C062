import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBcHTIFeZaJHw3V1e97UtMCpIKcquXTdWo",
  authDomain: "project-60v2.firebaseapp.com",
  databaseURL: "https://project-60v2-default-rtdb.firebaseio.com",
  projectId: "project-60v2",
  storageBucket: "project-60v2.appspot.com",
  messagingSenderId: "429158797837",
  appId: "1:429158797837:web:3b25b6ea2866aefd3e3b44"
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();