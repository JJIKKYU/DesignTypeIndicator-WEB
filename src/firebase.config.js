import * as firebase from 'firebase'

let database;
const config = {
  apiKey: "AIzaSyAna9uC37HrVCaoNqD4j32e6fGwYPHAGW8",
  authDomain: "dpti-85ab7.firebaseapp.com",
  databaseURL: "https://dpti-85ab7.firebaseio.com",
  projectId: "dpti-85ab7",
  storageBucket: "dpti-85ab7.appspot.com",
  messagingSenderId: "363037217874",
  appId: "1:363037217874:web:f4cdab338ea01566a1bb8b",
  measurementId: "G-GLMM28Q6WE"
};

export const fire = () => {
  if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }
database = firebase.database()
}

export const getFireDB = () => {
  return database.ref('/people').once('value')
}

export const setFireDB = (props) => {
  return database.ref('/people').set({
    people : props
  });
}