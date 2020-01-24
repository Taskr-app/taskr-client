import React from 'react';
import Layout from '../Layout';
import styles from './ProjectLayout.module.scss';
import Button from 'antd/lib/button';
import { GetUserProjectQuery } from '../../../generated/graphql';
import Members from './Members';

interface Props {
  children: React.ReactNode;
  title: string;
  createListModal: () => void;
  inviteMemberModal: () => void;
  project: GetUserProjectQuery;
}

const ProjectLayout: React.FC<Props> = ({
  children,
  title,
  createListModal,
  inviteMemberModal,
  project
}) => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <Button className={styles.createlistButton} onClick={createListModal}>
            Create List
          </Button>
          <Button
            className={styles.projectInviteButton}
            onClick={inviteMemberModal}
          >
            Invite
          </Button>
          <Members project={project} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </Layout>
  );
};

export default ProjectLayout;
