
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDUkUfNiYbr2k99BhVQA9z65lx4tI2mlVc",
  authDomain: "awesome-todo-104f4.firebaseapp.com",
  databaseURL: "https://awesome-todo-104f4.firebaseio.com",
  projectId: "awesome-todo-104f4",
  storageBucket: "awesome-todo-104f4.appspot.com",
  messagingSenderId: "495464441291",
  appId: "1:495464441291:web:ecdb3fbbb95cd49a02824e"
};


let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }