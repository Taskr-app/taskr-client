import React from 'react';
import { useModal } from '..';
import { Modal, Icon } from 'antd';
import styles from './TaskModal.module.scss';

interface Props {
  title: string;
  id: string;
  desc: string;
}

interface ModalTitleProps {
  title: string;
}

interface SideBarItemProps {
  icon: string;
  name: string;
}

const SideBarItem: React.FC<SideBarItemProps> = ({ icon, name }) => {
  return (
    <div className={styles.sidebarItem}>
      <Icon type={icon} style={{ marginRight: '4px' }} />
      <span>{name}</span>
    </div>
  );
};

const ModalTitle: React.FC<ModalTitleProps> = ({ title }) => {
  return (
    <div className={styles.title}>
      <Icon type="robot" style={{ marginRight: '12px' }} />
      {title}
    </div>
  );
};

const TaskModal: React.FC<Props> = ({ title, id, desc }) => {
  const { hideModal } = useModal();
  const unmount = () => hideModal();

  return (
    <Modal
      bodyStyle={{
        padding: '16px 24px',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between'
      }}
      title={<ModalTitle title={title} />}
      visible={true}
      onCancel={unmount}
    >
      <div className={styles.innerContainer}>
        <div className={styles.descContainer}>
          <div className={styles.descHeader}>
            <Icon type="tag" style={{ marginRight: '12px' }} />
            <div
              style={{ fontWeight: 700, marginLeft: 40, position: 'absolute' }}
            >
              Description
            </div>
          </div>
          <div className={styles.descContent}>{desc}</div>
        </div>

        <div className={styles.messagesContainer}>
          <div className={styles.messagesHeader}>
            <Icon type="bars" style={{ marginRight: '12px' }} />
            <div
              style={{ fontWeight: 700, marginLeft: 40, position: 'absolute' }}
            >
              Messages
            </div>
          </div>
          <div className={styles.messagesContent}>
            <div>wow!</div>
            <div>Blah blah blah om omgmsm stevefox!</div>
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        <SideBarItem icon={'user-add'} name={'Members'} />
        <SideBarItem icon={'setting'} name={'Options'} />
        <SideBarItem icon={'message'} name={'Message'} />
        <SideBarItem icon={'rest'} name={'Delete'} />
      </div>
    </Modal>
  );
};

export default TaskModal;
