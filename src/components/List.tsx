import React, { useEffect } from 'react';
import { useModal } from './modals';
import DeleteListModal from './modals/DeleteListModal';
import TitleForm from './TitleForm';
import {
  Task,
  useOnTaskMovedSubscription,
  OnTaskCreatedDocument,
  OnTaskDeletedDocument,
  useUpdateListNameMutation
} from '../generated/graphql';
import { Draggable } from 'react-beautiful-dnd';
import TasksContainer from './TasksContainer';
import styles from './List.module.scss';
import CreateTaskModal from './modals/CreateTaskModal';
import {
  subscribeToNewTasks,
  subscribeToDeletedTasks
} from '../pages/project/subscriptions';
import { SubscribeToMoreOptions } from 'apollo-client';
import { Icon } from 'antd';

const grid = 8;

const getListStyle = (isDragging: Boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

interface Props {
  querysub?: SubscribeToMoreOptions;
  ref?: any;
  id: number;
  key: string;
  name: string;
  index: number;
  tasks: Task[];
  refetch: () => void;
}

const List: React.FC<Props> = ({
  id,
  name,
  index,
  tasks,
  refetch,
  querysub
}) => {
  const { showModal } = useModal();
  useOnTaskMovedSubscription({
    variables: { listId: id.toString() },
    onSubscriptionData: () => {
      refetch();
    }
  });

  const showDeleteListModal = () =>
    showModal(<DeleteListModal name={name} id={id} />);
  const handleClick = () => {
    showDeleteListModal();
  };

  const showCreateTaskModal = () =>
    showModal(<CreateTaskModal listId={id.toString()} />);
  const handleClickAdd = () => {
    showCreateTaskModal();
  };

  useEffect(() => {
    subscribeToNewTasks(querysub, OnTaskCreatedDocument, { listId: id });
    subscribeToDeletedTasks(querysub, OnTaskDeletedDocument, { listId: id });
  }, []);

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          className={styles.container}
          style={getListStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className={styles.header} {...provided.dragHandleProps}>
            <TitleForm
              defaultTitle={name}
              id={id}
              mutationVariableName="name"
              mutationHook={useUpdateListNameMutation}
              color="#f4f8f8"
            />
            <Icon
              onClick={handleClick}
              className={styles.marginRight}
              type="minus"
            />
          </div>
          <div className={styles.content}>
            <TasksContainer id={id} tasks={tasks} querysub={querysub} />
          </div>
          <div className={styles.footer}>
            <div className={styles.addTask} onClick={handleClickAdd}>
              <div className={styles.addTaskTitle}>Add Task</div>
              <Icon className={styles.marginRight} type="plus" />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
