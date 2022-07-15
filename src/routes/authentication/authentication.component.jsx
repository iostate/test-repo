import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';

const Authentication = () => {
  const { currentValue } = useContext(UserContext);
  return (
    <div className='authentication-container'>
      {currentValue ? <h1>hi</h1> : <SignInForm />}

      <SignUpForm />
    </div>
  );
};

export default Authentication;
