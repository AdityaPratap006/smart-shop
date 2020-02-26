import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBnPFvSd5of2qoeqSSUm7BFQFOSmOBTFkU",
    authDomain: "smart-shop-71fee.firebaseapp.com",
    databaseURL: "https://smart-shop-71fee.firebaseio.com",
    projectId: "smart-shop-71fee",
    storageBucket: "smart-shop-71fee.appspot.com",
    messagingSenderId: "633734228563",
    appId: "1:633734228563:web:f3d1f4a3971315e26c34a6",
    measurementId: "G-EZV7P5T300"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider;
googleAuthProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithGoogle(googleAuthProvider);

export default firebase;