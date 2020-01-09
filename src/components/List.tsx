import React, { useEffect } from 'react';
import { useModal } from './modals';
import DeleteListModal from './modals/DeleteListModal';
import ListTitleForm from './ListTitleForm';
import { LinkText } from './common/Text';
import {
  Task,
  useOnTaskMovedSubscription,
  OnTaskCreatedDocument,
  GetProjectListsAndTasksDocument,
  useGetProjectListsAndTasksQuery,
  OnTaskDeletedDocument
} from '../generated/graphql';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TasksContainer from './TasksContainer';
import styles from './List.module.scss';
import CreateTaskModal from './modals/CreateTaskModal';
import { useQuery } from '@apollo/react-hooks';
import { previewImage } from 'antd/lib/upload/utils';
import {
  subscribeToNewTasks,
  subscribeToDeletedTasks
} from '../pages/project/subscriptions';
import { SubscribeToMoreOptions } from 'apollo-client';

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
  const handleClickTask = () => {
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
            <ListTitleForm defaultTitle={name} id={id} />
            <LinkText onClick={handleClick}>...</LinkText>
            <LinkText onClick={handleClickTask}>Add Task</LinkText>
          </div>
          <div className={styles.content}>
            <TasksContainer id={id} tasks={tasks} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
