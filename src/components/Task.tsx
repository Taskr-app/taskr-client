import React, { useState, SyntheticEvent, useEffect } from 'react';
import { Card, Icon } from 'antd';
import styles from './Task.module.scss';
import { useModal } from './modals';
import DeleteTaskModal from './modals/DeleteTaskModal';
import TaskModal from './modals/TaskModal';
import classNames from 'classnames';
import { subscribeToUpdatedTasks } from '../pages/project/subscriptions';
import { OnTaskUpdatedDocument } from '../generated/graphql';

interface Props {
  listId: string;
  id: string;
  name: string;
  desc: string;
  querysub?: any;
}

const Task: React.FC<Props> = ({ id, name, desc = '', querysub, listId }) => {
  const { showModal } = useModal();
  const [isHovering, setHovering] = useState(false);
  const showDeleteTaskModal = () => {
    showModal(<DeleteTaskModal name={name} id={parseInt(id)} />);
  };
  const showTaskModal = () => {
    showModal(<TaskModal title={name} id={id} desc={desc} />);
  };

  const handleClick = () => {
    showTaskModal();
  };

  const handleClickEdit = (e: SyntheticEvent) => {
    e.stopPropagation();
    showDeleteTaskModal();
  };

  let cardStyle = classNames(styles.container, {
    [styles.isHovering]: isHovering
  });

  useEffect(() => {
    subscribeToUpdatedTasks(querysub, OnTaskUpdatedDocument, {
      taskId: parseInt(id),
      listId: parseInt(listId)
    });
  }, []);

  return (
    <Card
      bodyStyle={{ padding: '12px 16px' }}
      className={cardStyle}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={handleClick}
    >
      <div>
        <div className={styles.icon}>
          {isHovering ? (
            <Icon
              type="plus-circle"
              onClick={handleClickEdit}
              style={{ zIndex: 100 }}
            />
          ) : null}
        </div>
        <div className={styles.text}>{name}</div>
      </div>
    </Card>
  );
};

export default Task;
