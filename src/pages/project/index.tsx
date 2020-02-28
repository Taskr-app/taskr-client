import React, { useEffect, useCallback } from 'react';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import {
  OnListCreatedDocument,
  OnListDeletedDocument,
  useUpdateListPosMutation,
  useOnListMovedSubscription,
  useGetUserProjectQuery,
  useGetProjectListsAndTasksQuery,
  GetProjectListsAndTasksDocument,
  useUpdateTaskPosMutation,
  OnAcceptProjectInviteDocument,
  OnAcceptProjectInviteSubscription
} from '../../generated/graphql';
import { errorMessage } from '../../lib/messageHandler';
import { useModal } from '../../components/modals';
import CreateListModal from '../../components/modals/CreateListModal';
import { useParams } from 'react-router';
import { decode } from '../../lib/hashids';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import ListsContainer from './ListsContainer';
import ProjectInviteMemberModal from '../../components/modals/ProjectInviteMemberModal';
import { reorderTasks, reorderAndAssignTempPos } from './reorder';
import sort from 'fast-sort';

interface RouteParams {
  projectId: string;
  projectName: string;
}

// const getBoardStyle = (isDraggingOver: Boolean) => ({
// });

const ProjectPage: React.FC = () => {
  const params = useParams<RouteParams>();
  const projectId = decode(params.projectId);
  const { showModal } = useModal();
  const showCreateListModal = () =>
    showModal(<CreateListModal projectId={projectId} />);
  const showInviteMemberModal = () =>
    showModal(<ProjectInviteMemberModal projectId={projectId} />);

  const {
    data,
    client,
    loading,
    subscribeToMore
  } = useGetProjectListsAndTasksQuery({
    variables: { projectId: projectId as string },
    onError: err => errorMessage(err)
  });

  const {
    data: projectData,
    subscribeToMore: subscribeToProject
  } = useGetUserProjectQuery({
    variables: { id: projectId as string },
    onError: err => errorMessage(err)
  });

  const [updateListPos] = useUpdateListPosMutation({ ignoreResults: true });
  const [updateTaskPos] = useUpdateTaskPosMutation({
    ignoreResults: true
  });

  useOnListMovedSubscription({
    variables: { projectId: projectId as string },
    onSubscriptionData: res => {
      const sortedLists = sort([...data!.getProjectListsAndTasks]).by({
        asc: list => list.pos
      });
      client.writeQuery({
        query: GetProjectListsAndTasksDocument,
        variables: { projectId: projectId as string },
        data: { getProjectListsAndTasks: sortedLists }
      });
    }
  });

  const subscribeToNewMembers = () => {
    subscribeToProject({
      document: OnAcceptProjectInviteDocument,
      variables: { projectId: projectId },
      updateQuery: (prev, { subscriptionData }: { subscriptionData: any }) => {
        if (!subscriptionData.data) return prev;
        return {
          ...prev,
          getUserProject: {
            ...prev.getUserProject,
            members: [
              ...prev.getUserProject.members,
              (subscriptionData.data as OnAcceptProjectInviteSubscription)
                .onAcceptProjectInvite
            ]
          }
        };
      }
    });
  };

  const subscribeToNewLists = () => {
    subscribeToMore({
      document: OnListCreatedDocument,
      variables: { projectId: projectId as string },
      updateQuery: (prev, { subscriptionData }: { subscriptionData: any }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          getProjectListsAndTasks: [
            ...prev.getProjectListsAndTasks,
            subscriptionData.data.onListCreated
          ]
        };
      }
    });
  };

  const subscribeToDeletedLists = () => {
    subscribeToMore({
      document: OnListDeletedDocument,
      variables: { projectId: projectId as string },
      updateQuery: (prev, { subscriptionData }: { subscriptionData: any }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newLists = prev.getProjectListsAndTasks.filter(
          list => list.id !== subscriptionData.data.onListDeleted.id
        );

        return { ...prev, getProjectListsAndTasks: newLists };
      }
    });
  };

  useEffect(() => {
    subscribeToNewLists();
    subscribeToDeletedLists();
    subscribeToNewMembers();
  }, []);

  const handleDragEnd = useCallback(
    async (result: DropResult, provided) => {
      const { source, destination, draggableId } = result;

      // no combine allowed
      if (result.combine) {
        if (result.type === 'LIST') {
          return;
        }
      }

      // dropped nowhere
      if (!destination || !data) {
        return;
      }

      // did not move anywhere - bail early
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const lists = data.getProjectListsAndTasks.map(list => ({
        ...list,
        tasks: [...list.tasks]
      }));

      // reorder a list in a project
      if (result.type === 'LIST') {
        const reorderedLists = reorderAndAssignTempPos(
          lists,
          source.index,
          destination.index
        );

        client.writeQuery({
          query: GetProjectListsAndTasksDocument,
          variables: { projectId: projectId as string },
          data: { getProjectListsAndTasks: reorderedLists }
        });

        // destination is first on list
        if (destination.index === 0) {
          await updateListPos({
            variables: {
              id: draggableId,
              belowId: lists[0].id
            }
          });
        }

        // destination is last on list
        else if (destination.index === lists.length - 1) {
          await updateListPos({
            variables: {
              id: draggableId,
              aboveId: lists[lists.length - 1].id
            }
          });
        } else {
          await updateListPos({
            variables: {
              id: draggableId,
              aboveId: reorderedLists[destination.index - 1].id,
              belowId: reorderedLists[destination.index + 1].id
            }
          });
        }
        return;
      }

      // Returns a new array of lists with reordered tasks
      const [reorderedListsAndTasks, mutationVariables] = await reorderTasks({
        lists,
        source,
        destination
      });

      // Write to query (state)
      client.writeQuery({
        query: GetProjectListsAndTasksDocument,
        variables: { projectId: projectId as string },
        data: { getProjectListsAndTasks: reorderedListsAndTasks }
      });

      // Call graphql mutation
      await updateTaskPos({
        variables: mutationVariables
      });

      return;
    },
    [data]
  );

  if (!data || !projectData || loading) {
    return <div></div>;
  }

  const renderLists = data!.getProjectListsAndTasks.map(list => ({
    ...list,
    tasks: [...list.tasks]
  }));

  sort(renderLists).by({
    asc: list => list.pos
  });

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ProjectLayout
        title={params.projectName}
        createListModal={showCreateListModal}
        inviteMemberModal={showInviteMemberModal}
        project={projectData}
      >
        {data && (
          <Droppable
            droppableId={`project-${projectId.toString()}`}
            type="LIST"
            direction="horizontal"
          >
            {(provided, snapshot) => {
              return (
                <ListsContainer
                  querysub={subscribeToMore}
                  provided={provided}
                  lists={renderLists}
                  // style={getBoardStyle(snapshot.isDraggingOver)}
                  projectId={projectId}
                />
              );
            }}
          </Droppable>
        )}
      </ProjectLayout>
    </DragDropContext>
  );
};

export default ProjectPage;
