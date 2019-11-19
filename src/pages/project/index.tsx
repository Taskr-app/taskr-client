import React, { useEffect, useCallback } from 'react';
import ProjectLayout from '../../components/layouts/ProjectLayout';
import {
  useGetUserProjectQuery,
  OnListCreatedDocument,
  OnListDeletedDocument
} from '../../generated/graphql';
import { errorMessage } from '../../lib/messageHandler';
import { Button } from 'antd';
import { useModal } from '../../components/modals';
import CreateListModal from '../../components/modals/CreateListModal';
import { useParams } from 'react-router';
import { decode } from '../../lib/hashids';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListsContainer from './ListsContiner';

interface RouteParams {
  projectId: string;
  projectName: string;
}

const ProjectPage: React.FC = () => {
  const params = useParams<RouteParams>();
  const projectId = decode(params.projectId);
  const { showModal } = useModal();
  const showCreateListModal = () =>
    showModal(<CreateListModal projectId={projectId} />);
  const { data, loading, subscribeToMore } = useGetUserProjectQuery({
    variables: { id: projectId as string },
    onError: err => errorMessage(err)
  });
  const subscribeToNewLists = () => {
    subscribeToMore({
      document: OnListCreatedDocument,
      variables: { projectId: projectId as string },
      updateQuery: (prev, { subscriptionData }: { subscriptionData: any }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newProject = {
          ...prev.getUserProject,
          lists: [
            ...prev.getUserProject.lists,
            subscriptionData.data.onListCreated
          ]
        };
        return { ...prev, getUserProject: newProject };
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
        const newProject = {
          ...prev.getUserProject,
          lists: prev.getUserProject.lists.filter(
            list => list.id !== subscriptionData.data.onListDeleted.id
          )
        };
        return { ...prev, getUserProject: newProject };
      }
    });
  };

  useEffect(() => {
    subscribeToNewLists();
    subscribeToDeletedLists();
  }, []);

  const handleDragEnd = useCallback(() => {
    console.log('drag end');
  }, []);

  if (!data && loading) {
    return <div>loading</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ProjectLayout title={params.projectName}>
        <Button onClick={showCreateListModal}>Create List</Button>
        {data && (
          <Droppable droppableId={projectId.toString()}>
            {(provided, snapshot) => {
              return (
                <ListsContainer
                  provided={provided}
                  lists={data.getUserProject.lists}
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
