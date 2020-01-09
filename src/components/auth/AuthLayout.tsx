import React from 'react';

import styles from './Auth.module.scss';
import { HeaderText, SubText, LinkText } from '../common/Text';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const authText: { [index: string]: any } = {
    '/login': {
      greeting: 'Log in to Taskr',
      alt: 'Don\'t have an account?',
      altLink: 'Sign up',
      altHref: '/register'
    },
    '/register': {
      greeting: 'Sign up to Taskr',
      alt: 'Already have an account?',
      altLink: 'Log in',
      altHref: '/login'
    },
    '/forgot-password': {
      greeting: 'Forgot password',
      alt: 'Go back to',
      altLink: 'Log in',
      altHref: '/login'
    },
    '/forgot-password/success': {
      greeting: 'Reset password',
      alt: 'Go back to',
      altLink: 'Log in',
      altHref: '/login'
    },
    '/new-email/success': {
      greeting: 'New password',
      alt: 'Go back',
      altLink: 'home',
      altHref: '/'
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.headerContainer}>
        <HeaderText white={1} style={{ marginBottom: '.5em' }}>
          {authText[location.pathname].greeting}
        </HeaderText>

        <div className={styles.highlight} />

        <div>
          <SubText white={1}>
            {authText[location.pathname].alt}{' '}
            <NavLink to={authText[location.pathname].altHref}>
              <LinkText>{authText[location.pathname].altLink}</LinkText>
            </NavLink>
          </SubText>
        </div>
      </div>
      <div className={styles.formContainer}>{children}</div>
    </div>
  );
};

export default AuthLayout;
