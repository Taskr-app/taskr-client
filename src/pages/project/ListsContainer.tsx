import React from 'react';
import { DroppableProvided } from 'react-beautiful-dnd';
import styles from './Project.module.scss';
import List from '../../components/List';
import { Task } from '../../generated/graphql';

interface Props {
  querysub?: any;
  provided: DroppableProvided;
  lists: {
    tasks: ({
      __typename?: 'Task' | undefined;
    } & Pick<Task, 'desc' | 'name' | 'id' | 'pos'>)[];
    __typename?: 'List' | undefined;
    name: string;
    id: string;
    pos: number;
  }[];
  style?: any;
  projectId: string;
}

const ListsContainer: React.FC<Props> = ({
  provided,
  lists,
  querysub,
  projectId
}) => {
  return (
    <div
      data-testid="board"
      className={styles.listsContainer}
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      {lists.map((list, index: number) => (
        <List
          querysub={querysub}
          key={list.id}
          id={parseInt(list.id)}
          name={list.name}
          index={index}
          tasks={list.tasks}
          projectId={projectId}
        />
      ))}
      {provided.placeholder}
    </div>
  );
};

export default ListsContainer;
