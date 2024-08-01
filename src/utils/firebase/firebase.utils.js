// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsC3P2jwMkrST8RouqTYvwVSkOIkW9520",
    authDomain: "crwn-clothing-app-f0c66.firebaseapp.com",
    projectId: "crwn-clothing-app-f0c66",
    storageBucket: "crwn-clothing-app-f0c66.appspot.com",
    messagingSenderId: "283523757083",
    appId: "1:283523757083:web:db1f225a8c4830e75174be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()
        try {
            setDoc(userDocRef, {
                displayName, email, createdAt
            })
        } catch(err) {
            console.log('error creating the user', err.message)
        }
    }

    return userDocRef

}


export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
