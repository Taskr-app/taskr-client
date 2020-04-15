import {
  UserAuthType,
  GetUserProjectDocument,
  GetUserProjectQuery,
  GetProjectListsAndTasksQuery,
  OnTaskMovedDocument,
  OnTaskCreatedDocument,
  OnTaskDeletedDocument,
  OnListMovedDocument,
  OnListCreatedDocument,
  OnListDeletedDocument,
  OnAcceptProjectInviteDocument,
  GetProjectListsAndTasksDocument,
  List,
  User,
  Task,
  OnTaskUpdatedDocument,
  CreateTaskDocument,
} from '../../generated/graphql';
import { MockedResponse } from '@apollo/react-testing';

type mockUser = Pick<
  User,
  'id' | 'email' | 'username' | 'avatar' | 'auth' | '__typename'
>;
type mockTask = Pick<Task, 'id' | 'name' | 'pos' | 'desc' | '__typename'>;

export const projectId = '1';
const buffer = 16384;
const userMock: mockUser = {
  id: '1',
  email: 'dev@email.com',
  username: 'dev',
  avatar: null,
  auth: UserAuthType.Website,
  __typename: 'User',
};
const toDos: mockTask[] = [
  { name: 'Write tests', id: '1', pos: buffer, desc: 'ok', __typename: 'Task' },
  {
    name: 'Code review',
    id: '2',
    pos: buffer * 2,
    desc: null,
    __typename: 'Task',
  },
  {
    name: 'Eat a snack',
    id: '3',
    pos: buffer * 3,
    desc: 'yum',
    __typename: 'Task',
  },
];

const finished: mockTask[] = [
  {
    name: 'Take out the trash',
    id: '4',
    pos: buffer,
    desc: 'ok',
    __typename: 'Task',
  },
  {
    name: 'Dnd feature',
    id: '5',
    pos: buffer * 2,
    desc: null,
    __typename: 'Task',
  },
  {
    name: 'Make coffee',
    id: '6',
    pos: buffer * 3,
    desc: 'yum',
    __typename: 'Task',
  },
];

export const listsAndTasksMock: (Pick<
  List,
  'id' | 'name' | 'pos' | '__typename'
> & {
  tasks: Pick<Task, 'id' | 'name' | 'pos' | 'desc' | '__typename'>[];
})[] = [
  {
    name: 'ooga',
    id: '1',
    pos: buffer,
    tasks: toDos,
    __typename: 'List',
  },
  {
    name: 'booga',
    id: '2',
    pos: buffer * 2,
    tasks: finished,
    __typename: 'List',
  },
];

const getUserProjectMock = {
  request: {
    query: GetUserProjectDocument,
    variables: {
      id: projectId,
    },
  },
  result: (): { data: GetUserProjectQuery } => ({
    data: {
      getUserProject: {
        id: 1,
        name: 'testing',
        members: [userMock],
        owner: userMock,
        __typename: 'Project',
      },
    },
  }),
};

const getProjectListsAndTasksMock = {
  request: {
    query: GetProjectListsAndTasksDocument,
    variables: {
      projectId,
    },
  },
  result: (): { data: GetProjectListsAndTasksQuery } => ({
    data: {
      getProjectListsAndTasks: listsAndTasksMock,
    },
  }),
};

const onTaskMovedMocks = listsAndTasksMock.map((list) => ({
  request: {
    query: OnTaskMovedDocument,
    variables: {
      listId: parseInt(list.id),
    },
  },
  result: {
    data: {
      onTaskMoved: undefined,
    },
  },
}));

const onTaskCreatedMocks = listsAndTasksMock.map((list) => ({
  request: {
    query: OnTaskCreatedDocument,
    variables: {
      listId: parseInt(list.id),
    },
  },
  result: {
    data: {},
  },
}));

const onTaskDeletedMocks = listsAndTasksMock.map((list) => ({
  request: {
    query: OnTaskDeletedDocument,
    variables: {
      listId: parseInt(list.id),
    },
  },
  result: {
    data: {},
  },
}));

const onTaskUpdatedMocks = listsAndTasksMock.reduce(
  (mocksArr: any[], list) => [
    ...mocksArr,
    ...list.tasks.map((task) => ({
      request: {
        query: OnTaskUpdatedDocument,
        variables: {
          taskId: parseInt(task.id),
          listId: parseInt(list.id),
        },
      },
      result: {
        data: {},
      },
    })),
  ],
  []
);

export const mocks: MockedResponse[] = [
  getUserProjectMock,
  getProjectListsAndTasksMock,

  {
    request: {
      query: OnListMovedDocument,
      variables: {
        projectId,
      },
    },
    result: {
      data: undefined,
    },
  },
  {
    request: {
      query: OnListCreatedDocument,
      variables: {
        projectId,
      },
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: OnListDeletedDocument,
      variables: {
        projectId,
      },
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: OnAcceptProjectInviteDocument,
      variables: {
        projectId,
      },
    },
    result: {
      data: {
        undefined,
      },
    },
  },
  ...onTaskMovedMocks,
  ...onTaskCreatedMocks,
  ...onTaskDeletedMocks,
  ...onTaskUpdatedMocks,
];
