import React from 'react';
import { useModal } from '..';
import { Modal, Icon } from 'antd';
import styles from './TaskModal.module.scss';
import TitleForm from '../../TitleForm';
import { useUpdateTaskMutation } from '../../../generated/graphql';

interface Props {
  title: string;
  id: string;
  desc: string;
}

interface ModalTitleProps {
  title: string;
  id: string;
}

const SideBarItems = [
  ['user-add', 'Members'],
  ['setting', 'Options'],
  ['message', 'Message'],
  ['rest', 'Delete']
];

const ModalTitle: React.FC<ModalTitleProps> = ({ title, id }) => {
  return (
    <div className={styles.title}>
      <Icon type="robot" style={{ marginRight: '12px' }} />
      <TitleForm
        fontSize="1.2em"
        id={parseInt(id)}
        defaultTitle={title}
        mutationHook={useUpdateTaskMutation}
        mutationVariableName="name"
      />
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
      title={<ModalTitle title={title} id={id} />}
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
        {SideBarItems.map(item => (
          <div className={styles.sidebarItem} key={item[1]}>
            <Icon type={item[0]} style={{ marginRight: '4px' }} />
            <span>{item[1]}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TaskModal;
