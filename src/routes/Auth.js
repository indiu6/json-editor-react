import React from 'react';
import { authService, firebaseInstance } from '../myFirebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faJsfiddle,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import AuthForm from '../components/AuthForm';

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;

    if (name === 'google')
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    else if (name === 'github')
      provider = new firebaseInstance.auth.GithubAuthProvider();

    await authService.signInWithPopup(provider);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faJsfiddle}
        color={'#04AAFF'}
        size="4x"
        style={{ marginBottom: 20 }}
      />
      <span style={{ marginBottom: 20, fontSize: 24 }}>JSONify</span>

      <AuthForm />

      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>

        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
