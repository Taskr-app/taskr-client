import React from 'react';
import {
  Draggable,
  DroppableProvided,
  Droppable,
  DroppableProps
} from 'react-beautiful-dnd';
import { Task as TaskResponse } from '../generated/graphql';
import Task from './Task';
import styles from './TasksContainer.module.scss';
import cn from 'classnames';

const grid = 1;

const getTaskStyle = (isDragging: Boolean, draggableStyle: any) => ({
  // some basic styles to make the items look nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

interface TasksContainerProps {
  id: number;
  tasks: Pick<TaskResponse, 'id' | 'name' | 'desc'>[];
  querysub?: any;
}

// @types not updated for ~v12
interface DroppablePropsWithRenderClone extends DroppableProps {
  renderClone?: any;
}

const DroppableWithRenderClone: React.FC<DroppablePropsWithRenderClone> = props => {
  return <Droppable {...props} />;
};

type InnerListProps = {
  dropProvided: DroppableProvided;
  listId: number;
  tasks: Pick<TaskResponse, 'id' | 'name' | 'desc'>[];
  querysub?: any;
};

type TaskProps = {
  tasks: Pick<TaskResponse, 'id' | 'name' | 'desc'>[];
  querysub?: any;
  listId: number;
};

const InnerTaskList = React.memo(function InnerTaskList({
  tasks,
  querysub,
  listId
}: TaskProps) {
  return (
    <>
      {tasks.map((task, index) => (
        <Draggable
          draggableId={`${task.name}-${task.id}`}
          index={index}
          key={task.id}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Task
                id={task.id}
                listId={listId.toString()}
                name={task.name}
                key={`${task.id}-${task.name}`}
                desc={task.desc ? task.desc : ''}
                querysub={querysub}
              />
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
});

const InnerList = (props: InnerListProps) => {
  const { tasks, dropProvided, listId, querysub } = props;

  return (
    <div>
      <div style={{ minHeight: 250 }} ref={dropProvided.innerRef}>
        <InnerTaskList tasks={tasks} listId={listId} querysub={querysub} />
        {dropProvided.placeholder}
      </div>
    </div>
  );
};

const TasksContainer: React.FC<TasksContainerProps> = ({
  tasks,
  id,
  querysub
}) => {
  return (
    <DroppableWithRenderClone
      droppableId={`list-${id}`}
      type="TASK"
      isCombineEnabled={false}
      direction="vertical"
      renderClone={(provided: any, snapshot: any, rubric: any) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.task}
          style={getTaskStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Task
            listId={id.toString()}
            id={tasks[rubric.source.index].id}
            name={tasks[rubric.source.index].name}
            key={`${tasks[rubric.source.index].id}-${
              tasks[rubric.source.index].name
            }`}
            desc={tasks[rubric.source.index].desc!}
            querysub={querysub}
          />
        </div>
      )}
    >
      {(provided, snapshot) => (
        <div
          className={cn(styles.tasksContainer, {
            [styles.isDraggingOver]: snapshot.isDraggingOver
          })}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <InnerList
            listId={id}
            tasks={tasks}
            dropProvided={provided}
            querysub={querysub}
          />
        </div>
      )}
    </DroppableWithRenderClone>
  );
};

export default TasksContainer;
