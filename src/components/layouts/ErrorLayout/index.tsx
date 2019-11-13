import React from 'react';
import { Empty } from 'antd';
import Layout from '../Layout';

import styles from './ErrorLayout.module.scss'

interface Props {
  message?: string
}

/**
 * 
 * @param message (Optional) - Render error message center of screen
 */

const ErrorLayout: React.FC<Props> = ({ message }) => {
  return (
    <Layout hide={1}>
      <div className={styles.errorLayout}>
      <Empty
        image="/static/error/4x/square-remove-12@4x.png"
        imageStyle={{
          opacity: 0.6
        }}
        description={
          <span>
            {message ? message : 'Oops! Something went wrong.'}
          </span>
        }
      />
      </div>
    </Layout>
  )
}

export default ErrorLayout;