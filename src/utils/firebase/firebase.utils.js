// https://firebase.google.com/docs/firestore/quickstart
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA_JM-LlpXbwbMFdApTdaEX9dsvkBnkNvM',
  authDomain: 'crwn-db-4eb31.firebaseapp.com',
  projectId: 'crwn-db-4eb31',
  storageBucket: 'crwn-db-4eb31.appspot.com',
  messagingSenderId: '51690540782',
  appId: '1:51690540782:web:e187bd4ae211857c4f2dff',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(firebaseApp); // anytime we need to interact with our db, we pass this variable

/**
 * Get the document reference by giving the userAuth uid path to doc().
 * Use getDoc to check if the Document Reference exists.
 *
 * @param {} userAuth
 * @returns
 */
export const createUserProfileDocument = async (userAuth) => {
  // if (!userAuth) return;

  // Returns a UUID for this document
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return userDocRef;
};

// const addDocument = async () => {
//   try {
//     const docRef = await addDoc(collection(db, 'users'), {
//       first: 'Ada',
//       last: 'Lovelace',
//       born: 1815,
//     });
//     console.log('Document written with ID: ', docRef.id);
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// };
