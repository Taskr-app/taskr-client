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

const grid = 1;
const containerHeight = 250;

const getTasksContainerStyle = (isDraggingOver: Boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'none'
  // maxHeight: `${containerHeight}px`
});

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

interface Props {
  id: number;
  tasks: Pick<TaskResponse, 'id' | 'name' | 'desc'>[];
}

// @types not updated for ~v12
interface DroppablePropsWithRenderClone extends DroppableProps {
  renderClone?: any;
}

const DroppableWithRenderClone: React.FC<DroppablePropsWithRenderClone> = props => {
  return <Droppable {...props} />;
};

type InnerTaskListProps = {
  dropProvided: DroppableProvided;
  tasks: Pick<TaskResponse, 'id' | 'name' | 'desc'>[];
};

type TaskProps = {
  tasks: Pick<TaskResponse, 'id' | 'name' | 'desc'>[];
};

// FIXME: types (props: TaskProps) | currently any
const InnerTaskList = React.memo(function InnerTaskList(props: any) {
  return props.tasks.map((task: any, index: number) => (
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
            name={task.name}
            key={`${task.id}-${task.name}`}
            desc={task.desc}
          />
        </div>
      )}
    </Draggable>
  ));
});

const InnerList = (props: InnerTaskListProps) => {
  const { tasks, dropProvided } = props;

  return (
    <div>
      <div style={{ minHeight: 250 }} ref={dropProvided.innerRef}>
        <InnerTaskList tasks={tasks} />
        {dropProvided.placeholder}
      </div>
    </div>
  );
};

const TasksContainer: React.FC<Props> = ({ tasks, id }) => {
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
          style={getTaskStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <Task
            id={tasks[rubric.source.index].id}
            name={tasks[rubric.source.index].name}
            key={`${tasks[rubric.source.index].id}-${
              tasks[rubric.source.index].name
            }`}
            desc={tasks[rubric.source.index].desc!}
          />
        </div>
      )}
    >
      {(provided, snapshot) => (
        <div
          className={styles.tasksContainer}
          ref={provided.innerRef}
          style={getTasksContainerStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          <InnerList tasks={tasks} dropProvided={provided} />
        </div>
      )}
    </DroppableWithRenderClone>
  );
};

export default TasksContainer;
