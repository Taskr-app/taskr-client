import React from 'react';
// import { Empty } from 'antd';
import { ReactComponent as CryFace } from '../../../assets/cry-57-3.svg';
import Layout from '../Layout';

import styles from './ErrorLayout.module.scss';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

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
            ? message
            : 'Oops! The page you were looking for was not found.'}
        </div>

        <Button
          className={styles.errorButton}
          size='large'
          icon='left'
          onClick={goBack}
        >
          Go Back
        </Button>
      </div>
    </Layout>
  );
};

export default ErrorLayout;
