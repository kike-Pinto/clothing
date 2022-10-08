import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAHPENkHjFdyUJtoQGuOYTKA5179fmruoU',
  authDomain: 'clothing-db-cd495.firebaseapp.com',
  projectId: 'clothing-db-cd495',
  storageBucket: 'clothing-db-cd495.appspot.com',
  messagingSenderId: '1077093068140',
  appId: '1:1077093068140:web:e0ec0d5582be200712d749',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

//setCustomParameters = parametro personalizado que contiene la clave que indica la documentacion del proveedor OAuth y su valor correspondiente
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

//we use getFirestore in order to use the batabase
export const db = getFirestore()

//getting the data from authentication service
export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return
  //doc has 3 arguments
  //1 database
  //2 collection
  //3 unique identifier
  const userDocRef = doc(db, 'users', userAuth.uid)

  // console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  // console.log(userSnapshot)
  // console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef

  //if user does not exist
  //create / set the document with the data from userAuth in my collection

  //if user data exists
  //return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
