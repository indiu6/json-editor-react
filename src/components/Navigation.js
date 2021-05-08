import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJsfiddle } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faJsfiddle} color={'#04AAFF'} size="3x" />
            <span style={{ marginTop: 5, display: 'flex', marginLeft: 5 }}>
              Home
            </span>
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            style={{
              marginLeft: 30,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size="3x" />
            <span style={{ marginTop: 6 }}>
              {userObj.displayName
                ? `${userObj.displayName}'s Profile`
                : 'Profile'}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
