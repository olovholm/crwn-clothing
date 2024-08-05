// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, onAuthStateChanged, signOut, signInWithRedirect, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore"



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

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()
        try {
            setDoc(userDocRef, {
                displayName, email, createdAt, ...additionalInformation
            })
        } catch(err) {
            console.log('error creating the user', err.message)
        }
    }

    return userDocRef

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}


export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const signOutUser = async () => signOut(auth)

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log("batch loaded")
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data()
        acc[title.toLowerCase()] = items
        return acc
        },{})

    return categoryMap
}

