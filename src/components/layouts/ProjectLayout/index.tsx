import React from 'react';
import Layout from '../Layout';
import styles from './ProjectLayout.module.scss';

interface Props {
  children: React.ReactNode;
  title: string;
}

const ProjectLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <Layout title={title}>
      <div className={styles.container}>
        <h1>projecttitlefiller</h1>
        <div>{children}</div>
      </div>
    </Layout>
  );
};

export default ProjectLayout;
