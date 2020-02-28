import React, { useEffect } from 'react';
import { useModal } from './modals';
import DeleteListModal from './modals/DeleteListModal';
import TitleForm from './TitleForm';
import {
  Task,
  useOnTaskMovedSubscription,
  OnTaskCreatedDocument,
  OnTaskDeletedDocument,
  useUpdateListNameMutation,
  GetProjectListsAndTasksDocument,
  useGetProjectListsAndTasksQuery
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
import sort from 'fast-sort';

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
  projectId: string;
  key: string;
  name: string;
  index: number;
  tasks: Pick<Task, 'desc' | 'name' | 'id' | 'pos'>[];
}

const List: React.FC<Props> = ({
  id,
  name,
  index,
  tasks,
  querysub,
  projectId
}) => {
  const { showModal } = useModal();
  const { data, client } = useGetProjectListsAndTasksQuery({
    variables: { projectId: projectId.toString() }
  });

  useOnTaskMovedSubscription({
    variables: { listId: (id as unknown) as string },
    onSubscriptionData: res => {
      if (res.subscriptionData.data && data) {
        const { task: taskData } = res.subscriptionData.data.onTaskMoved;
        const queryClone = data.getProjectListsAndTasks.map(list => ({
          ...list,
          tasks: [...list.tasks]
        }));

        // Check if data's list.id matches component's id prop
        if (parseInt(taskData.list.id) === id) {
          // Find list in query
          const list = queryClone.find(list => parseInt(list.id) === id);

          // Find task in list and update its pos
          const task = list!.tasks.find(task => taskData.id === task.id);

          // If task exists in list, update pos
          // Else append the task to list and sort the list
          if (task) task.pos = taskData.pos;
          else {
            list!.tasks.push(taskData);
            sort(list!.tasks).by({
              asc: task => task.pos
            });
          }
        } else {
          // Splice task off list
          const list = queryClone.find(list => parseInt(list.id) === id);
          list!.tasks.forEach((task, index) => {
            if (task.id === taskData.id) list!.tasks.splice(index, 1);
          });
        }

        client.writeQuery({
          query: GetProjectListsAndTasksDocument,
          variables: { projectId: projectId as string },
          data: { getProjectListsAndTasks: queryClone }
        });
      }
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
    subscribeToNewTasks(querysub, OnTaskCreatedDocument, {
      listId: id
    });
    subscribeToDeletedTasks(querysub, OnTaskDeletedDocument, {
      listId: id
    });
  }, []);

  sort(tasks).by({
    asc: task => task.pos
  });

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
