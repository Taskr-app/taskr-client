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
  User
} from '../../generated/graphql';
import { MockedResponse } from '@apollo/react-testing';

export const projectId = '1';
const userMock: Pick<
  User,
  'id' | 'email' | 'username' | 'avatar' | 'auth' | '__typename'
> = {
  id: '1',
  email: 'dev@email.com',
  username: 'dev',
  avatar: null,
  auth: UserAuthType.Website,
  __typename: 'User'
};

export const listsAndTasksMock: Pick<
  List,
  'id' | 'pos' | 'tasks' | 'name' | '__typename'
>[] = [
  {
    name: 'ooga',
    id: '1',
    pos: 16384,
    tasks: [],
    __typename: 'List'
  },
  {
    name: 'booga',
    id: '2',
    pos: 32768,
    tasks: [],
    __typename: 'List'
  }
];

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
      onTaskMoved: undefined
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

export const mocks: MockedResponse[] = [
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
      data: undefined
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
      data: {
        undefined
      }
    }
  },
  ...onTaskMovedMocks,
  ...onTaskCreatedMocks,
  ...onTaskDeletedMocks
];
