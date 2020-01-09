import React from 'react';
import Layout from '../Layout';
import styles from './ProjectLayout.module.scss';
import Button from 'antd/lib/button';

interface Props {
  children: React.ReactNode;
  title: string;
  createListModal: () => void;
}

const ProjectLayout: React.FC<Props> = ({
  children,
  title,
  createListModal
}) => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{title}</h1>
          <Button onClick={createListModal}>Create List</Button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </Layout>
  );
};

export default ProjectLayout;
