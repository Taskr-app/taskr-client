import React, { useState } from 'react';
import { useModal } from '..';
import { Modal, Icon } from 'antd';
import styles from './TaskModal.module.scss';
import TitleForm from '../../TitleForm';
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation
} from '../../../generated/graphql';
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

// desc
// nofocus - desc + edit button
// focus - desc editable textarea
// no desc
// nofocus - button - Add a description..
// focus - add a description - editable textarea

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

const TaskModal: React.FC<Props> = ({ title, id, desc = '' }) => {
  console.log('desc is', desc, typeof desc);
  const { showModal, hideModal } = useModal();
  const unmount = () => hideModal();
  const [description, setDescription] = useState(desc);
  const [updateTask] = useUpdateTaskMutation();

  const handleDelete = () => {
    showModal(<DeleteTaskModal name={'this card?'} id={parseInt(id)} />);
  };

  const handleBlur = () => {
    if (desc.localeCompare(description) !== 0) {
      console.log('updating task - api', title, description);
      // updateTask({ variables: { id, desc } });
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
