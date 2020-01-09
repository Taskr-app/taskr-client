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

      const result = { ...prev };

      // (n)
      for (let i = 0; i < result.getProjectListsAndTasks.length; i += 1) {
        if (variables.listId === result.getProjectListsAndTasks[i].id) {
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
      const result = { ...prev };

      // (n)
      for (let i = 0; i < result.getProjectListsAndTasks.length; i += 1) {
        if (variables.listId === result.getProjectListsAndTasks[i].id) {
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
