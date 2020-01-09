import { List, Task } from '../../generated/graphql';
import { DraggableLocation } from 'react-beautiful-dnd';

type ReorderTasksArgs = {
  lists: (Pick<List, 'id' | 'name' | 'pos'> & {
    tasks: Pick<Task, 'id' | 'name'>[];
  })[];
  source: DraggableLocation;
  destination: DraggableLocation;
};

type ReorderTasksResult = (Pick<List, 'id' | 'name' | 'pos'> & {
  tasks: Pick<Task, 'id' | 'name'>[];
})[];

const reorder = (lists: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(lists);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default reorder;

export const reorderTasks = ({
  lists,
  source,
  destination
}: ReorderTasksArgs): ReorderTasksResult => {
  // (n)
  const result = lists.map(list => ({
    ...list,
    tasks: Array.from(list.tasks)
  }));

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    // find index of lists where id = droppableId (n)
    for (let i = 0; i < result.length; i += 1) {
      if (result[i].id === source.droppableId.split('-')[1]) {
        result[i].tasks = reorder(
          result[i].tasks,
          source.index,
          destination.index
        );
        break;
      }
    }
    return result;
  }

  // moving to diff list
  let task: Pick<Task, 'id' | 'name'>;

  // remove from original (n)
  for (let i = 0; i < result.length; i += 1) {
    if (result[i].id === source.droppableId.split('-')[1]) {
      task = result[i].tasks.splice(source.index, 1)[0];
    }
  }

  // insert into another list (n)
  for (let i = 0; i < result.length; i += 1) {
    if (result[i].id === destination.droppableId.split('-')[1]) {
      result[i].tasks.splice(destination.index, 0, task!);
    }
  }
  return result;
};
