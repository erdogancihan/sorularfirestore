import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import rootReducer from "../store/reducers/rootReducer";

// Initialize Firebase
var fbConfig = {
  apiKey: "AIzaSyCHwFB6lCbk3dupDRbSp9AkZqCiQyCWMpE",
  authDomain: "sorular-a37b9.firebaseapp.com",
  databaseURL: "https://sorular-a37b9.firebaseio.com",
  projectId: "sorular-a37b9",
  storageBucket: "sorular-a37b9.appspot.com",
  messagingSenderId: "876076188848"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true
};

// Initialize firebase instance
firebase.initializeApp(fbConfig);

// Initialize Cloud Firestore through Firebase
firebase.firestore().settings({ timestampsInSnapshots: true });

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument, rfConfig as optional second
  reduxFirestore(firebase)
)(createStore);

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);
export default store;
