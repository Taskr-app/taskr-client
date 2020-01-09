import React, { useState, SyntheticEvent } from 'react';
import { Card, Icon } from 'antd';
import styles from './Task.module.scss';
import { useModal } from './modals';
import DeleteTaskModal from './modals/DeleteTaskModal';
import TaskModal from './modals/TaskModal';
import classNames from 'classnames';

interface Props {
  id: string;
  name: string;
  desc: string;
}

const Task: React.FC<Props> = ({ id, name, desc }) => {
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
        <div>{name}</div>
      </div>
    </Card>
  );
};

export default Task;
