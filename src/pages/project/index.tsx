import React, { useEffect, useCallback } from 'react';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import {
  OnListCreatedDocument,
  OnListDeletedDocument,
  useGetProjectListsQuery,
  useUpdateListPosMutation,
  useOnListMovedSubscription,
  useGetUserProjectQuery
} from '../../generated/graphql';
import { errorMessage } from '../../lib/messageHandler';
import { useModal } from '../../components/modals';
import CreateListModal from '../../components/modals/CreateListModal';
import { useParams } from 'react-router';
import { decode } from '../../lib/hashids';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ListsContainer from './ListsContainer';
import InviteMemberModal from '../../components/modals/InviteMemberModal';

interface RouteParams {
  projectId: string;
  projectName: string;
}

const grid = 8;

const getBoardStyle = (isDraggingOver: Boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex'
});

const ProjectPage: React.FC = () => {
  const params = useParams<RouteParams>();
  const projectId = decode(params.projectId);
  const { showModal } = useModal();
  const showCreateListModal = () =>
    showModal(<CreateListModal projectId={projectId} />);
  const showInviteMemberModal = () =>
    showModal(<InviteMemberModal projectId={projectId} />);

  const {
    data,
    client,
    refetch,
    loading,
    subscribeToMore
  } = useGetProjectListsQuery({
    variables: { projectId: projectId as string },
    onError: err => errorMessage(err)
  });
  useGetUserProjectQuery({
    variables: { id: projectId as string },
    onError: err => errorMessage(err)
  });

  const [updateListPos] = useUpdateListPosMutation({ ignoreResults: true });

  useOnListMovedSubscription({
    variables: { projectId: projectId as string },
    onSubscriptionData: () => refetch()
  });

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
          getProjectLists: [
            ...prev.getProjectLists,
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
        const newLists = prev.getProjectLists.filter(
          list => list.id !== subscriptionData.data.onListDeleted.id
        );
        return { ...prev, getProjectLists: newLists };
      }
    });
  };

  useEffect(() => {
    subscribeToNewLists();
    subscribeToDeletedLists();
  }, []);

  const handleDragEnd = useCallback(
    async (result, provided) => {
      const { source, destination, draggableId } = result;

      if (!destination || !data) {
        return;
      }
      const lists = data.getProjectLists;

      const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      };

      if (source.draggableId === destination.draggableId) {
        const reorderedLists = reorder(lists, source.index, destination.index);

        // change local state (but not their positions)
        // ultra jank, MIGHT NEED TO USE writeQuery, look into it
        const dataGetProjectLists = `getProjectLists({"projectId":"${projectId}"})`;
        const newData = { [dataGetProjectLists]: reorderedLists };
        client.writeData({
          data: {
            ...newData
          }
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
      }
    },
    [data]
  );

  if (!data && loading) {
    return <div>loading</div>;
  }

  const renderLists = data!.getProjectLists;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ProjectLayout
        title={params.projectName}
        createListModal={showCreateListModal}
        inviteMemberModal={showInviteMemberModal}
      >
        {data && (
          <Droppable droppableId={projectId.toString()} direction="horizontal">
            {(provided, snapshot) => {
              return (
                <ListsContainer
                  provided={provided}
                  lists={renderLists}
                  style={getBoardStyle(snapshot.isDraggingOver)}
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
