export const subscribeToNewTasks = (
  subToMore: any,
  document: any,
  variables: { listId: number }
): any => {
  subToMore({
    document,
    variables,
    updateQuery: (
      prev: any,
      { subscriptionData }: { subscriptionData: any }
    ) => {
      if (!subscriptionData.data) {
        return prev;
      }

      const result = {
        ...prev,
        getProjectListsAndTasks: prev.getProjectListsAndTasks.map(
          (list: any) => ({
            ...list,
            tasks: [...list.tasks]
          })
        )
      };

      for (let i = 0; i < result.getProjectListsAndTasks.length; i += 1) {
        console.log(
          result.getProjectListsAndTasks[i].id,
          typeof result.getProjectListsAndTasks[i].id
        );
        if (
          variables.listId === parseInt(result.getProjectListsAndTasks[i].id)
        ) {
          const cloneList = {
            ...result.getProjectListsAndTasks[i],
            tasks: [
              ...result.getProjectListsAndTasks[i].tasks,
              subscriptionData.data.onTaskCreated
            ]
          };

          result.getProjectListsAndTasks[i] = cloneList;
          return result;
        }
      }
      return prev;
    }
  });
};

export const subscribeToDeletedTasks = (
  subToMore: any,
  document: any,
  variables: { listId: number }
) => {
  subToMore({
    document,
    variables,
    updateQuery: (
      prev: any,
      { subscriptionData }: { subscriptionData: any }
    ) => {
      if (!subscriptionData.data) {
        return prev;
      }

      const result = {
        ...prev,
        getProjectListsAndTasks: prev.getProjectListsAndTasks.map(
          (list: any) => ({
            ...list,
            tasks: [...list.tasks]
          })
        )
      };

      for (let i = 0; i < result.getProjectListsAndTasks.length; i += 1) {
        if (
          variables.listId === parseInt(result.getProjectListsAndTasks[i].id)
        ) {
          result.getProjectListsAndTasks[
            i
          ].tasks = result.getProjectListsAndTasks[i].tasks.filter(
            (task: any) => task.id !== subscriptionData.data.onTaskDeleted.id
          );
          return result;
        }
      }
      return prev;
    }
  });
};

export const subscribeToUpdatedTasks = (
  subToMore: any,
  document: any,
  variables: { taskId: number; listId: number }
) => {
  subToMore({
    document,
    variables,
    updateQuery: (
      prev: any,
      { subscriptionData }: { subscriptionData: any }
    ) => {
      if (!subscriptionData.data) {
        return prev;
      }
      const result = {
        ...prev,
        getProjectListsAndTasks: prev.getProjectListsAndTasks.map(
          (list: any) => ({
            ...list,
            tasks: [...list.tasks]
          })
        )
      };

      const list = result.getProjectListsAndTasks.find(
        (list: any) => parseInt(list.id) === variables.listId
      );

      if (!list) {
        return prev;
      }

      const taskIndex = list.tasks.findIndex(
        (task: any) => parseInt(task.id) === variables.taskId
      );

      if (!taskIndex) {
        return prev;
      }

      list.tasks[taskIndex] = subscriptionData.data.onTaskUpdated;

      return result;
    }
  });
};
