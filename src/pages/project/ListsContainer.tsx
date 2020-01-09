import React from 'react';
import { DroppableProvided } from 'react-beautiful-dnd';
import styles from './Project.module.scss';
import List from '../../components/List';
import { List as ListResponse } from '../../generated/graphql';

interface Props {
  querysub?: any;
  provided: DroppableProvided;
  lists: Pick<ListResponse, 'id' | 'name' | 'pos'>[];
  style: any;
  refetch: () => void;
}

const ListsContainer: React.FC<Props> = ({
  provided,
  lists,
  style,
  refetch,
  querysub
}) => {
  return (
    <div
      className={styles.listsContainer}
      ref={provided.innerRef}
      {...provided.droppableProps}
      style={style}
    >
      {lists.map((list: any, index: number) => (
        <List
          querysub={querysub}
          key={list.id}
          id={list.id}
          name={list.name}
          index={index}
          tasks={list.tasks}
          refetch={refetch}
        />
      ))}
      {provided.placeholder}
    </div>
  );
};

export default ListsContainer;
