import React, { useState } from 'react';
import { useModal } from '..';
import { Modal, Icon } from 'antd';
import styles from './TaskModal.module.scss';
import TitleForm from '../../TitleForm';
import { useUpdateTaskMutation } from '../../../generated/graphql';
import cn from 'classnames';
import DeleteTaskModal from '../DeleteTaskModal';
import TextArea from 'antd/lib/input/TextArea';

interface Props {
  title: string;
  id: string;
  desc: string;
}

interface ModalTitleProps {
  title: string;
  id: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ title, id }) => {
  return (
    <div className={styles.title}>
      <Icon type="robot" style={{ marginRight: '12px' }} />
      <TitleForm
        style={{ paddingRight: '30px' }}
        fontSize="1.2em"
        id={parseInt(id)}
        defaultTitle={title}
        mutationHook={useUpdateTaskMutation}
        mutationVariableName="name"
      />
    </div>
  );
};

const TaskModal: React.FC<Props> = ({ title, id, desc = '' }) => {
  const { showModal, hideModal } = useModal();
  const unmount = () => hideModal();
  const [initialDesc, setInitialDesc] = useState(desc);
  const [description, setDescription] = useState(desc);
  const [updateTask] = useUpdateTaskMutation();

  const handleDelete = () => {
    showModal(<DeleteTaskModal name={'this card?'} id={parseInt(id)} />);
  };

  const handleBlur = async () => {
    if (initialDesc.localeCompare(description) !== 0) {
      await updateTask({ variables: { id, desc: description } });
      setInitialDesc(description);
    }
  };

  const SideBarItems = [
    { icon: 'user-add', name: 'Add' },
    // { icon: 'setting', name: 'Options' },
    { icon: 'message', name: 'Message' },
    { icon: 'rest', name: 'Delete', onClick: handleDelete }
  ];

  return (
    <Modal
      bodyStyle={{
        minWidth: '300px',
        padding: '16px 24px',
        marginRight: '32px',
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
            <Icon
              type="tag"
              style={{ marginRight: '12px', marginBottom: '6px' }}
            />
            <div
              style={{ fontWeight: 700, marginLeft: 40, position: 'absolute' }}
            >
              Description
            </div>
          </div>
          <div className={styles.descContent}>
            <TextArea
              dir="auto"
              onBlur={handleBlur}
              placeholder={'Add a description...'}
              className={styles.descTextArea}
              autoSize={true}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.messagesContainer}>
          <div className={styles.messagesHeader}>
            <Icon
              type="bars"
              style={{ marginRight: '12px', marginBottom: '6px' }}
            />
            <div
              style={{ fontWeight: 700, marginLeft: 40, position: 'absolute' }}
            >
              Messages
            </div>
          </div>
          <div className={styles.messagesContent}>
            <div>Text Sample</div>
            <div>Text Sample</div>
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        {SideBarItems.map(item => (
          <div
            className={cn(styles.sidebarItem, styles[item.name])}
            key={item.name}
            onClick={item.onClick}
          >
            <Icon type={item.icon} style={{ marginRight: '4px' }} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TaskModal;
