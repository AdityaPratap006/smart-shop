import firebase from 'firebase/app';
import 'firebase/auth';

import Axios from 'axios';

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

export const createUserProfile =  async (userAuthObject , additionalData, caller) => {

    if(!userAuthObject){
        return;
    }


    return Axios
            .post('https://smart-shop-api.herokuapp.com/createUser', {
            userId: userAuthObject.uid,
            name: userAuthObject.displayName ||(additionalData && additionalData.name),
            email: userAuthObject.email,
            profilePicUrl: userAuthObject.photoURL ||(additionalData && additionalData.profilePic)
            })
            .then(res2 => res2.data)
            .then(recievedData => {
            
                // userDBData = recievedData;
                // console.log({ createdUser: recievedData , });
                // console.log({caller: caller});
                return recievedData;
            
            })
            // .catch(err => {
            
            // console.log({ errorCreatingUser: err });
            // console.log({caller: caller});
            
            
            // })

    
    // return Axios
    //     .post('https://smart-shop-api.herokuapp.com/user', {
    //         userId: userAuthObject.uid
    //     })
    //     .then(res => res.data)
    //     .then(data =>({
    //             data: data,
    //             additionalData: additionalData,
    //         })
    //     )
    //     .then(({data, additionalData}) => {

    //         let userDBData = null;

    //         console.log({exists: data.exists, caller: caller,});

    //         if(!data.exists){
    //           //add here
    //         }else{
    //             userDBData = data.data[0]
    //         }

    //         return userDBData;
    //     })
    
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({ display: 'popup'});
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

// export const signInWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email,password) 

export default firebase;
