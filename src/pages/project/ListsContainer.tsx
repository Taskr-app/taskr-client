import React from 'react';
import { Draggable, DroppableProvided } from 'react-beautiful-dnd';
import styles from './Project.module.scss';
import List from '../../components/List';
import { List as ListResponse } from '../../generated/graphql';

interface Props {
  provided: DroppableProvided;
  lists: Pick<ListResponse, 'id' | 'name' | 'pos'>[];
  style: any;
}

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

const ListsContainer: React.FC<Props> = ({ provided, lists, style }) => {
  return (
    <div
      className={styles.listsContainer}
      ref={provided.innerRef}
      {...provided.droppableProps}
      style={style}
    >
      {lists.map((list: any, index: number) => (
        <Draggable draggableId={list.id.toString()} index={index} key={list.id}>
          {(provided, snapshot) => (
            <div
              style={getListStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <List id={list.id} key={list.id} name={list.name} />
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  );
};

export default ListsContainer;
