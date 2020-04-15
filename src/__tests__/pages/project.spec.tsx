import * as React from 'react';
import {
  MockedProvider,
  wait,
  MockedResponse,
  MockSubscriptionLink,
} from '@apollo/react-testing';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ProjectPage from '../../pages/project';
import { encode } from '../../lib/hashids';
import { act } from 'react-dom/test-utils';
import { mocks } from '../utils/mockListsAndTasks';
import { mockDndElSpacing } from '../utils/rbdHelpers';
import { ModalProvider } from '../../components/modals';
import {
  CreateTaskDocument,
  OnTaskCreatedDocument,
} from '../../generated/graphql';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

// Should be able to edit list's name

describe('Project Page', () => {
  const projectId = '1';
  const projectName = 'testing';
  const hashedId = encode(projectId);

  // if query data is defined, render <ProjectPage />
  let root: HTMLDivElement;

  beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterAll(() => {
    document.body.removeChild(root);
  });

  const renderApp = async (mocks: MockedResponse[]) => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <ModalProvider>
          <MemoryRouter
            initialEntries={[`/project/${hashedId}/${projectName}`]}
          >
            <Route
              path="/project/:projectId/:projectName"
              component={ProjectPage}
            />
          </MemoryRouter>
        </ModalProvider>
      </MockedProvider>
    );
    await act(async () => {
      await wait(0);
      mockDndElSpacing(component);
      await wait(0);
    });
    return component;
  };

  test('should fetch user project and render project with lists and their tasks', async () => {
    const { getByText } = await renderApp(mocks);
    getByText('ooga');
    getByText('Write tests');
    getByText('booga');
    getByText('Code review');
    getByText('Take out the trash');
    getByText('Dnd feature');
    getByText('Make coffee');
  });

  // Should be able to add a task
  test('should be able to add a task', async () => {
    // FIX: CreateTaskMutationMock is not being mocked!!!
    const mockTask = {
      id: '7',
      name: 'Sip some coffee',
      pos: 65536,
      __typename: 'Task',
    };
    const createTaskMutationMock: MockedResponse = {
      request: {
        query: CreateTaskDocument,
        variables: {
          listId: '1',
          name: mockTask.name,
        },
      },
      result: {
        data: mockTask,
      },
    };
    const onTaskCreatedMock: MockedResponse = {
      request: {
        query: OnTaskCreatedDocument,
        variables: {
          listId: '1',
        },
      },
      result: {
        data: mockTask,
      },
    };

    const renderAppWithSub = async () => {
      const link = new MockSubscriptionLink();
      const client = new ApolloClient({
        link,
        cache: new InMemoryCache(),
      });

      const component = render(
        <ApolloProvider client={client}>
          <MockedProvider
            mocks={[...mocks, createTaskMutationMock, onTaskCreatedMock]}
            addTypename={true}
          >
            <ModalProvider>
              <MemoryRouter
                initialEntries={[`/project/${hashedId}/${projectName}`]}
              >
                <Route
                  path="/project/:projectId/:projectName"
                  component={ProjectPage}
                />
              </MemoryRouter>
            </ModalProvider>
          </MockedProvider>
        </ApolloProvider>
      );
      await act(async () => {
        await wait(0);
        mockDndElSpacing(component);
        await wait(0);
      });
      return component;
    };

    const {
      queryAllByText,
      getByText,
      findByPlaceholderText,
      debug,
    } = await renderAppWithSub();
    const addTasks = queryAllByText('Add Task');
    debug();
    // Assert
    expect(addTasks[0]).toBeTruthy();
    // Click Add Task
    fireEvent.click(addTasks[0]);
    // Find and change input in modal
    const modalInput = await findByPlaceholderText('List name');
    fireEvent.change(modalInput, {
      target: { value: 'Sip some coffee' },
    });
    expect((modalInput as HTMLInputElement).value).toBe('Sip some coffee');

    // Click OK to add task
    fireEvent.click(getByText('OK'));

    await act(async () => {
      await wait(0);
    });
    // Assert
    // expect(await findByText('Sip some coffee'));
  });

  test('should render loading state', async () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={true}>
        <MemoryRouter initialEntries={[`/project/${hashedId}/${projectName}`]}>
          <Route
            path="/project/:projectId/:projectName"
            component={ProjectPage}
          />
        </MemoryRouter>
      </MockedProvider>
    );
    console.log(component.queryAllByText('Add Task'));
  });
});
