import React from 'react';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import styles from './Project.module.scss';
import List from '../../components/List';
import { List as ListResponse } from '../../generated/graphql';

interface Props {
  provided: DroppableProvided;
  lists: Pick<ListResponse, 'id' | 'name' | 'pos'>[];
}

const ListsContainer: React.FC<Props> = ({ provided, lists }) => {
  return (
    <div
      className={styles.listsContainer}
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      {lists.map((list: any, index: number) => (
        <Draggable draggableId={list.id.toString()} index={index} key={list.id}>
          {(provided, snapshot) => (
            <div
              className={styles.listContainer}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <List id={list.id} key={list.id} name={list.name} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default ListsContainer;
