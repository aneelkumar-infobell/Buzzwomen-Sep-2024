// Import the functions you need from the SDKs you need




// import * as firebase from "firebase/app";




// // Import the functions you need from the SDKs you need




// import * as auth from "firebase/auth";




import firebase from 'firebase'




// import { initializeApp } from "firebase/app";




// import { getAnalytics } from "firebase/analytics";




// TODO: Add SDKs for Firebase products that you want to use




// https://firebase.google.com/docs/web/setup#available-libraries







// Your web app's Firebase configuration




// For Firebase JS SDK v7.20.0 and later, measurementId is optional




// const firebaseConfig = {







//   apiKey: "AIzaSyBe0nrf82PXlt7gFO1vasjYxlTGWvmbU7w",







//   authDomain: "nw1buzzstaff.firebaseapp.com",







//   projectId: "nw1buzzstaff",







//   storageBucket: "nw1buzzstaff.appspot.com",







//   messagingSenderId: "208460223530",







//   appId: "1:208460223530:web:e4da52dc554101efb85f53",







//   measurementId: "G-DPYRKG0833"







// };







const firebaseConfig = {
  apiKey: "AIzaSyAj7lrXu9aU6om6h-jhb9hhkAFiqJNlwMs",
  authDomain: "buzzstaffwomengambia.firebaseapp.com",
  projectId: "buzzstaffwomengambia",
  storageBucket: "buzzstaffwomengambia.appspot.com",
  messagingSenderId: "15705323189",
  appId: "1:15705323189:web:0cf4dc80d0ff96665930fc",
  measurementId: "G-9C8KVSCRXL"
}

// Initialize Firebase




// const firebaseApp = firebase.initializeApp(firebaseConfig);




// const auths = firebaseApp.auth();




// const provider = new auth.GoogleAuthProvider();







// export { auths, provider };







const firebaseApp = firebase.initializeApp(firebaseConfig);




const auth = firebaseApp.auth();




const provider = new firebase.auth.GoogleAuthProvider();







export { auth, provider };