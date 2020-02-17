import { List, Task } from '../../generated/graphql';
import { DraggableLocation } from 'react-beautiful-dnd';
import { positionBuffer } from '../../lib/constants';

interface MutationVariables {
  taskMoved: TaskMovedInput;
  moreTasks?: TaskInput[];
}

interface TaskMovedInput extends TaskInput {
  listId: string;
}

interface TaskInput {
  id: string;
  pos: number;
}

type ReorderTasksArgs = {
  lists: (Pick<List, 'id' | 'name' | 'pos'> & {
    tasks: Pick<Task, 'id' | 'name' | 'pos'>[];
  })[];
  source: DraggableLocation;
  destination: DraggableLocation;
};

type ReorderTasksResult = [
  (Pick<List, 'id' | 'name' | 'pos'> & {
    tasks: Pick<Task, 'id' | 'name' | 'pos'>[];
  })[],
  MutationVariables
];

const reorder = (lists: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(lists);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default reorder;

export const reorderAndAssignTempPos = (
  lists: any[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(lists);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  endIndex === 0
    ? (result[endIndex].pos = 0)
    : (result[endIndex].pos = result[endIndex - 1].pos + 1);
  return result;
};

export const reorderTasks = async ({
  lists,
  source,
  destination
}: ReorderTasksArgs): Promise<ReorderTasksResult> => {
  const result = lists.map(list => ({
    ...list,
    tasks: Array.from(list.tasks)
  }));

  let sourceList: Pick<List, 'id' | 'name' | 'pos'> & {
    tasks: Pick<Task, 'id' | 'name' | 'pos'>[];
  };
  let destinationList: Pick<List, 'id' | 'name' | 'pos'> & {
    tasks: Pick<Task, 'id' | 'name' | 'pos'>[];
  };

  // Find source and destination lists
  result.forEach(list => {
    if (source.droppableId.split('-')[1] === list.id) sourceList = list;
    if (destination.droppableId.split('-')[1] === list.id)
      destinationList = list;
  });

  // Moving task
  const { id, pos } = sourceList!.tasks[source.index];
  const mutationVariables: MutationVariables = {
    taskMoved: { id, pos, listId: destinationList!.id }
  };

  // Task moved in the same list (source)
  if (source.droppableId === destination.droppableId) {
    const [
      repositionedTasks,
      { pos: newPosition, moreTasks }
    ] = repositionTasks(
      destinationList!.tasks,
      source.index,
      destination.index
    );
    // Assign repositionedtasks to list's tasks
    destinationList!.tasks = repositionedTasks;

    // Save mutation variables
    // save updated pos
    mutationVariables.taskMoved.pos = newPosition;
    if (moreTasks.length) mutationVariables.moreTasks = moreTasks;

    return [result, mutationVariables];
  }

  // Task move to another list

  // Removes task in a list and returns the removed task
  const [removedTask] = sourceList!.tasks.splice(source.index, 1);

  // Append removed task
  destinationList!.tasks.push(removedTask);

  // Reposition list with new task
  const [repositionedTasks, { pos: newPosition, moreTasks }] = repositionTasks(
    destinationList!.tasks,
    destinationList!.tasks.length - 1,
    destination.index
  );

  // Assign repositionedtasks to list's tasks
  destinationList!.tasks = repositionedTasks;

  // Save mutation variables
  mutationVariables.taskMoved.pos = newPosition;
  if (moreTasks.length) mutationVariables.moreTasks = moreTasks;

  return [result, mutationVariables];
};

const repositionTasks = (
  list: Pick<Task, 'id' | 'name' | 'pos'>[],
  startIndex: number,
  endIndex: number
): [
  Pick<Task, 'id' | 'name' | 'pos'>[],
  { pos: number; moreTasks: TaskInput[] }
] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  // Append extra tasks repositioned from collision handling
  const moreTasksRepositioned: TaskInput[] = [];
  let newPositionAndMoreTasks: { pos: number; moreTasks: TaskInput[] | [] } = {
    pos: removed.pos,
    moreTasks: moreTasksRepositioned
  };

  // If task is moving to empty list
  if (result.length === 1) {
    removed.pos = positionBuffer;
    newPositionAndMoreTasks.pos = removed.pos;
  }

  // Assign new position to removed (task)
  // Move to top of list
  else if (endIndex === 0) {
    // Collision handling: reposition every item in the list
    if (result.length > 1 && result[1].pos <= 1) {
      let counter = 1;
      list.forEach(item => {
        if (item.id === removed.id) {
          item.pos = positionBuffer;
        } else {
          item.pos = positionBuffer * counter + positionBuffer;
          counter += 1;
          moreTasksRepositioned.push({ id: item.id, pos: item.pos });
        }
      });
    } else {
      removed.pos = Math.round(result[1].pos / 2 + Number.EPSILON * 1) / 1;
      newPositionAndMoreTasks.pos = removed.pos;
    }
  }
  // Move to bottom of list
  else if (endIndex === result.length - 1) {
    removed.pos = result[endIndex - 1].pos + positionBuffer;
    newPositionAndMoreTasks.pos = removed.pos;
  }
  // Move in between two items
  else {
    // Collision handling: reposition items from endIndex to lastIndex
    if (Math.abs(result[endIndex - 1].pos - result[endIndex + 1].pos) <= 1) {
      // Start from endIndex until lastIndex (add task by buffer)
      result[endIndex].pos = result[endIndex - 1].pos + positionBuffer;
      // Add following tasks by buffer*2
      for (let i = endIndex + 1; i < result.length - 1; i += 1) {
        result[i].pos = result[i - 1].pos + positionBuffer * 2;
        newPositionAndMoreTasks.pos = result[i].pos;
        moreTasksRepositioned.push({ id: result[i].id, pos: result[i].pos });
      }
    } else {
      removed.pos =
        Math.round(
          ((result[endIndex - 1].pos + result[endIndex + 1].pos) / 2 +
            Number.EPSILON) *
            1
        ) / 1;
      newPositionAndMoreTasks.pos = removed.pos;
    }
  }

  return [result, newPositionAndMoreTasks];
};
