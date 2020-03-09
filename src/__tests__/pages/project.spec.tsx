import * as React from 'react';
import { render, mount } from 'enzyme';
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
import { act } from 'react-dom/test-utils';

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

    // Expects lists with names ooga and booga
    console.log('wrapper.html', wrapper);
    expect(wrapper.html()).toContain('ooga');
    expect(wrapper.html()).toContain('booga');
  });

  it('should render loading state', () => {
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
