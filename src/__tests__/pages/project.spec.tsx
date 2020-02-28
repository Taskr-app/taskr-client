import * as React from 'react';
import { render, mount, shallow, ReactWrapper } from 'enzyme';
import { MockedProvider, wait, MockedResponse } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router-dom';
import ProjectPage from '../../pages/project';
import {
  GetUserProjectDocument,
  OnListMovedDocument,
  OnListCreatedDocument,
  OnListDeletedDocument,
  OnAcceptProjectInviteDocument,
  GetProjectListsAndTasksDocument,
  UserAuthType,
  GetUserProjectQuery,
  GetProjectListsAndTasksQuery,
  OnTaskMovedDocument,
  OnTaskCreatedDocument,
  OnTaskDeletedDocument
} from '../../generated/graphql';
import { encode } from '../../lib/hashids';
import renderer, { act as reactAct } from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import ListsContainer from '../../pages/project/ListsContainer';
import { DragDropContext } from 'react-beautiful-dnd';

// fetches user's project, !data -> dont render data

// fetches project's lists and tasks
//check if query is called

// list
// test for CTA / mutation

describe('Project Page', () => {
  const projectId = '1';
  const projectName = 'testing';
  const hashedId = encode(projectId);
  const listsAndTasksMock = [
    {
      name: 'ooga',
      id: '1',
      pos: 16384,
      tasks: []
    },
    {
      name: 'booga',
      id: '2',
      pos: 32768,
      tasks: []
    }
  ];
  const userMock = {
    id: '1',
    email: 'dev@email.com',
    username: 'dev',
    avatar: null,
    auth: UserAuthType.Website
  };

  const getUserProjectMock = {
    request: {
      query: GetUserProjectDocument,
      variables: {
        id: projectId
      }
    },
    result: (): { data: GetUserProjectQuery } => ({
      data: {
        getUserProject: {
          id: 1,
          name: 'testing',
          members: [userMock],
          owner: userMock,
          __typename: 'Project'
        }
      }
    })
  };

  const getProjectListsAndTasksMock = {
    request: {
      query: GetProjectListsAndTasksDocument,
      variables: {
        projectId
      }
    },
    result: (): { data: GetProjectListsAndTasksQuery } => ({
      data: {
        getProjectListsAndTasks: listsAndTasksMock
      }
    })
  };

  const onTaskMovedData = [
    { id: '1', name: 'task1', desc: 'desc', pos: 16384, list: { id: '1' } }
  ];

  const onTaskMovedMocks = listsAndTasksMock.map(list => ({
    request: {
      query: OnTaskMovedDocument,
      variables: {
        listId: parseInt(list.id)
      }
    },
    result: {
      data: {
        onTaskMoved: {}
      }
    }
  }));

  const onTaskCreatedMocks = listsAndTasksMock.map(list => ({
    request: {
      query: OnTaskCreatedDocument,
      variables: {
        listId: parseInt(list.id)
      }
    },
    result: {
      data: {}
    }
  }));

  const onTaskDeletedMocks = listsAndTasksMock.map(list => ({
    request: {
      query: OnTaskDeletedDocument,
      variables: {
        listId: parseInt(list.id)
      }
    },
    result: {
      data: {}
    }
  }));

  const mocks: MockedResponse[] = [
    getUserProjectMock,
    getProjectListsAndTasksMock,
    {
      request: {
        query: OnListMovedDocument,
        variables: {
          projectId
        }
      },
      result: {
        data: {}
      }
    },
    {
      request: {
        query: OnListCreatedDocument,
        variables: {
          projectId
        }
      },
      result: {
        data: {}
      }
    },
    {
      request: {
        query: OnListDeletedDocument,
        variables: {
          projectId
        }
      },
      result: {
        data: {}
      }
    },
    {
      request: {
        query: OnAcceptProjectInviteDocument,
        variables: {
          projectId
        }
      },
      result: {
        data: {}
      }
    },
    ...onTaskMovedMocks,
    ...onTaskCreatedMocks,
    ...onTaskDeletedMocks
  ];

  // if query data is defined, render <ProjectPage />
  let wrapper: any;
  let root: any;

  beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterAll(() => {
    document.body.removeChild(root);
  });

  it('should fetch user project and render project with lists', async () => {
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[`/project/${hashedId}/${projectName}`]}>
          <Route
            path="/project/:projectId/:projectName"
            component={ProjectPage}
          />
        </MemoryRouter>
      </MockedProvider>,
      { attachTo: root }
    );
    await act(async () => {
      await wait(0);
    });
    wrapper.update();

    expect(wrapper.html()).toContain('section');

    // subToDeletedLists
  });

  it('should render loading state', async () => {
    const wrapper = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={[`/project/${hashedId}/${projectName}`]}>
          <Route
            path="/project/:projectId/:projectName"
            component={ProjectPage}
          />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(wrapper.html()).toBe('');
  });
});
