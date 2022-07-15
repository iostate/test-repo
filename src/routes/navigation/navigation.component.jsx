import { Fragment, useState, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

// type Developer = {
//   devName: string,
// };

// type Manager = {
//   name: string,
// };

// const benMallah: Manager = {
//   name: 'Ben Mallah',
// };

const Navigation = () => {
  // console.log(benMallah);
  const { setCurrentUser, currentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    const response = await signOutUser();
    setCurrentUser(null);
  };

  const token = currentUser?.accessToken;
  if (token) {
    console.log(token);
  }
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
          <Link className='nav-link' to='/contact-us'>
            CONTACT
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
