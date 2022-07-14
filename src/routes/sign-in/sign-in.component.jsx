import { signInWithGooglePopup, createUserProfileDocument } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserProfileDocument(user);
    // no matter what happens, I should get a user doc reference back
    console.log(userDocRef);
  };
  return (
    <>
      <div>
        <h1>Sign In Page!</h1>
        <button onClick={logGoogleUser}>Sign in With google</button>
      </div>
    </>
  );
};

export default SignIn;
