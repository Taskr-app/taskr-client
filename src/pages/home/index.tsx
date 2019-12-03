import React from 'react';
import Layout from '../../components/layouts/Layout';
import { HeaderText, HeaderSubText } from '../../components/common/Text';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <Layout dark={1}>
      <div className={styles.main}>
        <div className={styles.primaryHeader}>
          <div className={styles.left}>
            <HeaderText white={1} style={{ marginBottom: '28px' }}>
              Plan and collaborate on projects faster than ever
            </HeaderText>

            <HeaderSubText white={1} style={{ marginBottom: '28px' }}>
              Our app helps developers organize and plan out projects simply so
              you can prioritize development and pushing out features
            </HeaderSubText>

            <NavLink to={{ pathname: '/register' }}>
              <Button type='primary' block={true}>
                <span>Start your account - it's free</span>
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
