import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, addDoc, collection, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_JM-LlpXbwbMFdApTdaEX9dsvkBnkNvM',
  authDomain: 'crwn-db-4eb31.firebaseapp.com',
  projectId: 'crwn-db-4eb31',
  storageBucket: 'crwn-db-4eb31.appspot.com',
  messagingSenderId: '51690540782',
  appId: '1:51690540782:web:e187bd4ae211857c4f2dff',
};

const firebaseApp = initializeApp(firebaseConfig);

// Providers are instantiated as Classes, auth is instantiated as an instance of Auth
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
// Pass auth and the provider to these methods provided by Firebase
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const createContactFormDocument = async (data) => {
  if (!data) return;

  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, 'contact'), data);
  console.log('Document written with ID: ', docRef.id);
};

export const signOutUser = async () => {
  await signOut(auth);
};
