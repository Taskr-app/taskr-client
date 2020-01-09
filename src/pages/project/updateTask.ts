import { List, Task } from '../../generated/graphql';
import { DraggableLocation } from 'react-beautiful-dnd';

type updateTaskArgs = {
  id: string;
  list: Pick<List, 'id' | 'name' | 'pos'> & {
    tasks: Pick<Task, 'id' | 'name'>[];
  };
  destination: DraggableLocation;
  mutation: any;
};

const updateTask = async ({
  id,
  list,
  destination,
  mutation
}: updateTaskArgs) => {
  if (destination.index === 0) {
    if (list.tasks.length === 1) {
      // move task to an empty list
      await mutation({
        variables: {
          id,
          listId: destination.droppableId.split('-')[1]
        }
      });
    }
    // move task to top
    else
      await mutation({
        variables: {
          id,
          listId: destination.droppableId.split('-')[1],
          belowId: list!.tasks[1].id.toString()
        }
      });
  } else if (destination.index === list!.tasks.length - 1) {
    // move task to bottom
    await mutation({
      variables: {
        id,
        listId: destination.droppableId.split('-')[1],
        aboveId: list!.tasks[list!.tasks.length - 1].id.toString()
      }
    });
  } else {
    // move task in between
    await mutation({
      variables: {
        id,
        listId: destination.droppableId.split('-')[1],
        aboveId: list!.tasks[destination.index - 1].id.toString(),
        belowId: list!.tasks[destination.index + 1].id.toString()
      }
    });
  }
};
export default updateTask;
