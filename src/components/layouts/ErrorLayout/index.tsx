import React from 'react';
import { ReactComponent as CryFace } from '../../../assets/cry-57-3.svg';
import Layout from '../Layout';

import styles from './ErrorLayout.module.scss';
import { useHistory } from 'react-router-dom';
import { BackButton } from '../../common/Button';

interface Props {
  message?: string | React.ReactNode;
}

/**
 *
 * @param message (Optional) - Render error message center of screen
 */

const ErrorLayout: React.FC<Props> = ({ message }) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <Layout>
      <div className={styles.errorLayout}>
        <div className={styles.errorLogo}>
          <span className={styles.four}>4</span>
          <CryFace className={styles.cryFace} />
          <span className={styles.four}>4</span>
        </div>

        <div className={styles.errorMessage}>
          {message
            ? <><span className={styles.oops}>Oops! </span><span>{message}</span></>
            : 'Oops! The page you were looking for was not found.'}
        </div>

        <BackButton className={styles.errorButton} onClick={goBack}>
          Go Back
        </BackButton>
      </div>
    </Layout>
  );
};

export default ErrorLayout;
