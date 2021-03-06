import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
  /** String value that is a hex color code ie. #FFFFFF */
  HexColor: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};



export type InvitedUserResponse = {
   __typename?: 'InvitedUserResponse',
  email: Scalars['String'],
  avatar?: Maybe<Scalars['String']>,
};

export type InvitedUserSubscriptionPayload = {
   __typename?: 'InvitedUserSubscriptionPayload',
  email: Scalars['String'],
  projectId: Scalars['ID'],
  avatar?: Maybe<Scalars['String']>,
};

export type Label = {
   __typename?: 'Label',
  id: Scalars['ID'],
  name: Scalars['String'],
  color: Scalars['HexColor'],
  project: Project,
};

export type List = {
   __typename?: 'List',
  id: Scalars['ID'],
  name: Scalars['String'],
  pos: Scalars['Float'],
  project: Project,
  tasks: Array<Task>,
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  accessToken: Scalars['String'],
  user: User,
};

export type MovedTaskInput = {
  id: Scalars['ID'],
  pos: Scalars['Float'],
  listId: Scalars['ID'],
};

export type Mutation = {
   __typename?: 'Mutation',
  deleteTeam: Team,
  deleteList: List,
  sendVerificationLink: Scalars['String'],
  resendVerificationLink: Scalars['String'],
  register: LoginResponse,
  login: LoginResponse,
  logout: Scalars['Boolean'],
  auth_googleOAuth: LoginResponse,
  uploadAvatar: Scalars['Boolean'],
  updateUsername: Scalars['Boolean'],
  sendNewEmailLink: Scalars['Boolean'],
  updateEmail: Scalars['Boolean'],
  sendForgotPasswordLink: Scalars['String'],
  forgotPassword: Scalars['Boolean'],
  changePassword: Scalars['Boolean'],
  revokeRefreshToken: Scalars['Boolean'],
  createProject: Project,
  updateProject: Scalars['Boolean'],
  deleteProject: Scalars['Boolean'],
  sendProjectInviteLink: Scalars['Boolean'],
  acceptProjectInviteLink: Scalars['Boolean'],
  acceptPublicProjectLink: Scalars['Boolean'],
  createList: List,
  updateListName: Scalars['Boolean'],
  updateListPos: Array<List>,
  createTeam: Team,
  sendTeamInviteLink: Scalars['String'],
  acceptTeamInviteLink: Scalars['Boolean'],
  deleteTeamMember: Scalars['Boolean'],
  updateTeam: Team,
  deleteTeamProject: Team,
  createTask: Task,
  updateTask: Task,
  updateTaskPos: Scalars['Boolean'],
  deleteTask: Scalars['Boolean'],
  addTaskMember: Scalars['Boolean'],
  removeTaskMember: Scalars['Boolean'],
  createLabel: Scalars['Boolean'],
  assignLabel: Scalars['Boolean'],
  updateLabel: Scalars['Boolean'],
  removeTaskLabel: Scalars['Boolean'],
  deleteLabel: Scalars['Boolean'],
  createNotification: Scalars['Boolean'],
  deleteNotification: Scalars['Boolean'],
};


export type MutationDeleteTeamArgs = {
  id: Scalars['ID']
};


export type MutationDeleteListArgs = {
  id: Scalars['ID']
};


export type MutationSendVerificationLinkArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationResendVerificationLinkArgs = {
  email: Scalars['String']
};


export type MutationRegisterArgs = {
  password?: Maybe<Scalars['String']>,
  registerKey?: Maybe<Scalars['String']>,
  verificationLink: Scalars['String'],
  email: Scalars['String']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationAuth_GoogleOAuthArgs = {
  code: Scalars['String']
};


export type MutationUploadAvatarArgs = {
  image: Scalars['Upload']
};


export type MutationUpdateUsernameArgs = {
  username: Scalars['String']
};


export type MutationSendNewEmailLinkArgs = {
  email: Scalars['String']
};


export type MutationUpdateEmailArgs = {
  verificationLink: Scalars['String'],
  password?: Maybe<Scalars['String']>,
  email: Scalars['String']
};


export type MutationSendForgotPasswordLinkArgs = {
  email: Scalars['String']
};


export type MutationForgotPasswordArgs = {
  password: Scalars['String'],
  forgotPasswordLink: Scalars['String'],
  email: Scalars['String']
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'],
  currentPassword: Scalars['String']
};


export type MutationRevokeRefreshTokenArgs = {
  userId: Scalars['ID']
};


export type MutationCreateProjectArgs = {
  teamId?: Maybe<Scalars['ID']>,
  desc?: Maybe<Scalars['String']>,
  name: Scalars['String']
};


export type MutationUpdateProjectArgs = {
  teamId?: Maybe<Scalars['ID']>,
  desc?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  id: Scalars['ID']
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']
};


export type MutationSendProjectInviteLinkArgs = {
  message?: Maybe<Scalars['String']>,
  emails: Array<Scalars['String']>,
  projectId: Scalars['ID']
};


export type MutationAcceptProjectInviteLinkArgs = {
  projectInviteLink: Scalars['String'],
  id: Scalars['ID'],
  email: Scalars['String']
};


export type MutationAcceptPublicProjectLinkArgs = {
  projectId: Scalars['ID'],
  link: Scalars['String']
};


export type MutationCreateListArgs = {
  name: Scalars['String'],
  projectId: Scalars['ID']
};


export type MutationUpdateListNameArgs = {
  name: Scalars['String'],
  id: Scalars['ID']
};


export type MutationUpdateListPosArgs = {
  belowId?: Maybe<Scalars['ID']>,
  aboveId?: Maybe<Scalars['ID']>,
  id: Scalars['ID']
};


export type MutationCreateTeamArgs = {
  name: Scalars['String']
};


export type MutationSendTeamInviteLinkArgs = {
  email: Scalars['String'],
  teamId: Scalars['ID']
};


export type MutationAcceptTeamInviteLinkArgs = {
  teamInviteLink: Scalars['String'],
  email: Scalars['String']
};


export type MutationDeleteTeamMemberArgs = {
  userId: Scalars['ID'],
  teamId: Scalars['ID']
};


export type MutationUpdateTeamArgs = {
  name: Scalars['String'],
  teamId: Scalars['ID']
};


export type MutationDeleteTeamProjectArgs = {
  projectId: Scalars['ID'],
  teamId: Scalars['ID']
};


export type MutationCreateTaskArgs = {
  desc?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  listId: Scalars['ID']
};


export type MutationUpdateTaskArgs = {
  dueDate?: Maybe<Scalars['DateTime']>,
  desc?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  listId?: Maybe<Scalars['ID']>,
  id: Scalars['ID']
};


export type MutationUpdateTaskPosArgs = {
  taskMoved: MovedTaskInput,
  moreTasks?: Maybe<Array<TaskInput>>
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['ID']
};


export type MutationAddTaskMemberArgs = {
  userId: Scalars['ID'],
  id: Scalars['ID']
};


export type MutationRemoveTaskMemberArgs = {
  userId: Scalars['ID'],
  id: Scalars['ID']
};


export type MutationCreateLabelArgs = {
  color: Scalars['HexColor'],
  name: Scalars['String'],
  projectId: Scalars['ID']
};


export type MutationAssignLabelArgs = {
  labelId: Scalars['ID'],
  taskId: Scalars['ID']
};


export type MutationUpdateLabelArgs = {
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  color?: Maybe<Scalars['HexColor']>
};


export type MutationRemoveTaskLabelArgs = {
  taskId: Scalars['ID'],
  labelId: Scalars['ID']
};


export type MutationDeleteLabelArgs = {
  id: Scalars['ID']
};


export type MutationCreateNotificationArgs = {
  userId: Scalars['ID']
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['ID']
};

export type Notifications = {
   __typename?: 'Notifications',
  id: Scalars['ID'],
  date: Scalars['DateTime'],
  userId: Scalars['ID'],
  type: Scalars['String'],
  read: Scalars['Boolean'],
};

export type Project = {
   __typename?: 'Project',
  id: Scalars['Int'],
  name: Scalars['String'],
  desc?: Maybe<Scalars['String']>,
  created_at: Scalars['DateTime'],
  updated_at: Scalars['DateTime'],
  owner: User,
  lists: Array<List>,
  members: Array<User>,
  team: Team,
};

export type PublishTasksResult = {
   __typename?: 'PublishTasksResult',
  task: Task,
  moreTasks?: Maybe<Array<TaskWithPosResponse>>,
};

export type Query = {
   __typename?: 'Query',
  getAllTeams: Array<Team>,
  getTeam: Team,
  getAllLists: Array<List>,
  getList: List,
  me: User,
  getUsersByEmail: Array<User>,
  loginGoogleOAuth: Scalars['String'],
  getUserProject: Project,
  getUserProjects: Array<Project>,
  getProjectInvites: Array<InvitedUserResponse>,
  getPublicProjectLink: Scalars['String'],
  getProjectListsAndTasks: Array<List>,
  validateLink: Scalars['Boolean'],
  validatePublicProjectLink: Scalars['Boolean'],
  getUserTeam: Team,
  getUserTeams: Array<Team>,
  getListTasks: Array<Task>,
  getProjectLabels: Array<Label>,
  getNotifications: Array<Notifications>,
  getNotification: Notifications,
};


export type QueryGetTeamArgs = {
  id: Scalars['ID']
};


export type QueryGetListArgs = {
  id: Scalars['ID']
};


export type QueryGetUsersByEmailArgs = {
  search: Scalars['String']
};


export type QueryLoginGoogleOAuthArgs = {
  returnUrl?: Maybe<Scalars['String']>
};


export type QueryGetUserProjectArgs = {
  id: Scalars['ID']
};


export type QueryGetProjectInvitesArgs = {
  projectId: Scalars['ID']
};


export type QueryGetPublicProjectLinkArgs = {
  projectId: Scalars['ID']
};


export type QueryGetProjectListsAndTasksArgs = {
  projectId: Scalars['ID']
};


export type QueryValidateLinkArgs = {
  link: Scalars['String'],
  key: Scalars['String']
};


export type QueryValidatePublicProjectLinkArgs = {
  link: Scalars['String'],
  projectId: Scalars['ID']
};


export type QueryGetUserTeamArgs = {
  id: Scalars['ID']
};


export type QueryGetListTasksArgs = {
  listId: Scalars['ID']
};


export type QueryGetProjectLabelsArgs = {
  projectId: Scalars['ID']
};


export type QueryGetNotificationArgs = {
  id: Scalars['ID']
};

export type Subscription = {
   __typename?: 'Subscription',
  onSendProjectInvite: InvitedUserResponse,
  onAcceptProjectInvite: User,
  onListCreated: List,
  onListDeleted: List,
  onListUpdated: List,
  onListMoved: Array<List>,
  onTaskCreated: Task,
  onTaskDeleted: Task,
  onTaskUpdated: Task,
  onTaskMoved: PublishTasksResult,
  addedTaskMember: Task,
  removedTaskMember: Task,
  newNotification: Notifications,
};


export type SubscriptionOnSendProjectInviteArgs = {
  projectId: Scalars['ID']
};


export type SubscriptionOnAcceptProjectInviteArgs = {
  projectId: Scalars['ID']
};


export type SubscriptionOnListCreatedArgs = {
  projectId: Scalars['ID']
};


export type SubscriptionOnListDeletedArgs = {
  projectId: Scalars['ID']
};


export type SubscriptionOnListUpdatedArgs = {
  projectId: Scalars['ID']
};


export type SubscriptionOnListMovedArgs = {
  projectId: Scalars['ID']
};


export type SubscriptionOnTaskCreatedArgs = {
  listId: Scalars['ID']
};


export type SubscriptionOnTaskDeletedArgs = {
  listId: Scalars['ID']
};


export type SubscriptionOnTaskUpdatedArgs = {
  taskId: Scalars['ID']
};


export type SubscriptionOnTaskMovedArgs = {
  listId: Scalars['ID']
};


export type SubscriptionAddedTaskMemberArgs = {
  taskId: Scalars['Int']
};


export type SubscriptionRemovedTaskMemberArgs = {
  taskId: Scalars['Int']
};


export type SubscriptionNewNotificationArgs = {
  userId: Scalars['ID']
};

export type Task = {
   __typename?: 'Task',
  id: Scalars['ID'],
  name: Scalars['String'],
  desc?: Maybe<Scalars['String']>,
  dueDate?: Maybe<Scalars['DateTime']>,
  pos: Scalars['Float'],
  list: List,
  project: Project,
  users: Array<User>,
};

export type TaskInput = {
  id: Scalars['ID'],
  pos: Scalars['Float'],
};

export type TaskWithPosResponse = {
   __typename?: 'TaskWithPosResponse',
  id: Scalars['ID'],
  pos: Scalars['Float'],
};

export type Team = {
   __typename?: 'Team',
  id: Scalars['ID'],
  name: Scalars['String'],
  created_at: Scalars['DateTime'],
  updated_at: Scalars['DateTime'],
  members: Array<User>,
  owner: User,
  projects: Array<Project>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  username: Scalars['String'],
  avatar?: Maybe<Scalars['String']>,
  auth: UserAuthType,
  created_at: Scalars['DateTime'],
  updated_at: Scalars['DateTime'],
  ownedProjects: Array<Project>,
  ownedTeams: Array<Team>,
  projects: Array<Project>,
  teams: Array<Team>,
  tasks: Array<Task>,
};

/** User auth type for auth column (WEBSITE | GOOGLE) */
export enum UserAuthType {
  Website = 'WEBSITE',
  Google = 'GOOGLE'
}

export type ValidateLinkQueryVariables = {
  key: Scalars['String'],
  link: Scalars['String']
};


export type ValidateLinkQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'validateLink'>
);

export type ValidatePublicProjectLinkQueryVariables = {
  projectId: Scalars['ID'],
  link: Scalars['String']
};


export type ValidatePublicProjectLinkQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'validatePublicProjectLink'>
);

export type CreateListMutationVariables = {
  name: Scalars['String'],
  projectId: Scalars['ID']
};


export type CreateListMutation = (
  { __typename?: 'Mutation' }
  & { createList: (
    { __typename?: 'List' }
    & Pick<List, 'id' | 'name'>
  ) }
);

export type DeleteListMutationVariables = {
  id: Scalars['ID']
};


export type DeleteListMutation = (
  { __typename?: 'Mutation' }
  & { deleteList: (
    { __typename?: 'List' }
    & Pick<List, 'name'>
  ) }
);

export type GetProjectListsAndTasksQueryVariables = {
  projectId: Scalars['ID']
};


export type GetProjectListsAndTasksQuery = (
  { __typename?: 'Query' }
  & { getProjectListsAndTasks: Array<(
    { __typename?: 'List' }
    & Pick<List, 'name' | 'id' | 'pos'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'name' | 'id' | 'pos' | 'desc'>
    )> }
  )> }
);

export type OnListCreatedSubscriptionVariables = {
  projectId: Scalars['ID']
};


export type OnListCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { onListCreated: (
    { __typename?: 'List' }
    & Pick<List, 'name' | 'id' | 'pos'>
    & { tasks: Array<(
      { __typename?: 'Task' }
      & Pick<Task, 'name'>
    )> }
  ) }
);

export type OnListDeletedSubscriptionVariables = {
  projectId: Scalars['ID']
};


export type OnListDeletedSubscription = (
  { __typename?: 'Subscription' }
  & { onListDeleted: (
    { __typename?: 'List' }
    & Pick<List, 'name' | 'id' | 'pos'>
  ) }
);

export type OnListMovedSubscriptionVariables = {
  projectId: Scalars['ID']
};


export type OnListMovedSubscription = (
  { __typename?: 'Subscription' }
  & { onListMoved: Array<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'name' | 'pos'>
  )> }
);

export type OnListUpdatedSubscriptionVariables = {
  projectId: Scalars['ID']
};


export type OnListUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { onListUpdated: (
    { __typename?: 'List' }
    & Pick<List, 'id' | 'name' | 'pos'>
  ) }
);

export type UpdateListNameMutationVariables = {
  name: Scalars['String'],
  id: Scalars['ID']
};


export type UpdateListNameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateListName'>
);

export type UpdateListPosMutationVariables = {
  id: Scalars['ID'],
  aboveId?: Maybe<Scalars['ID']>,
  belowId?: Maybe<Scalars['ID']>
};


export type UpdateListPosMutation = (
  { __typename?: 'Mutation' }
  & { updateListPos: Array<(
    { __typename?: 'List' }
    & Pick<List, 'id' | 'pos'>
  )> }
);

export type GetNotificationsQueryVariables = {};


export type GetNotificationsQuery = (
  { __typename?: 'Query' }
  & { getNotifications: Array<(
    { __typename?: 'Notifications' }
    & Pick<Notifications, 'id' | 'userId' | 'type' | 'read'>
  )> }
);

export type NewNotificationSubscriptionVariables = {
  userId: Scalars['ID']
};


export type NewNotificationSubscription = (
  { __typename?: 'Subscription' }
  & { newNotification: (
    { __typename?: 'Notifications' }
    & Pick<Notifications, 'id' | 'date' | 'userId' | 'type' | 'read'>
  ) }
);

export type AcceptProjectInviteLinkMutationVariables = {
  email: Scalars['String'],
  id: Scalars['ID'],
  projectInviteLink: Scalars['String']
};


export type AcceptProjectInviteLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptProjectInviteLink'>
);

export type AcceptPublicProjectLinkMutationVariables = {
  link: Scalars['String'],
  projectId: Scalars['ID']
};


export type AcceptPublicProjectLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptPublicProjectLink'>
);

export type CreateProjectMutationVariables = {
  name: Scalars['String'],
  desc?: Maybe<Scalars['String']>
};


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
  ) }
);

export type GetProjectInvitesQueryVariables = {
  projectId: Scalars['ID']
};


export type GetProjectInvitesQuery = (
  { __typename?: 'Query' }
  & { getProjectInvites: Array<(
    { __typename?: 'InvitedUserResponse' }
    & Pick<InvitedUserResponse, 'email' | 'avatar'>
  )> }
);

export type GetPublicProjectLinkQueryVariables = {
  projectId: Scalars['ID']
};


export type GetPublicProjectLinkQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getPublicProjectLink'>
);

export type GetUserProjectQueryVariables = {
  id: Scalars['ID']
};


export type GetUserProjectQuery = (
  { __typename?: 'Query' }
  & { getUserProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name'>
    & { members: Array<{ __typename?: 'User' }
      & UserFragment
    >, owner: { __typename?: 'User' }
      & UserFragment
     }
  ) }
);

export type GetUserProjectsQueryVariables = {};


export type GetUserProjectsQuery = (
  { __typename?: 'Query' }
  & { getUserProjects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'desc'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username' | 'avatar'>
    ), members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username' | 'avatar'>
    )> }
  )> }
);

export type OnAcceptProjectInviteSubscriptionVariables = {
  projectId: Scalars['ID']
};


export type OnAcceptProjectInviteSubscription = (
  { __typename?: 'Subscription' }
  & { onAcceptProjectInvite: { __typename?: 'User' }
    & UserFragment
   }
);

export type OnSendProjectInviteSubscriptionVariables = {
  projectId: Scalars['ID']
};


export type OnSendProjectInviteSubscription = (
  { __typename?: 'Subscription' }
  & { onSendProjectInvite: (
    { __typename?: 'InvitedUserResponse' }
    & Pick<InvitedUserResponse, 'email' | 'avatar'>
  ) }
);

export type SendProjectInviteLinkMutationVariables = {
  emails: Array<Scalars['String']>,
  projectId: Scalars['ID'],
  message?: Maybe<Scalars['String']>
};


export type SendProjectInviteLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendProjectInviteLink'>
);

export type CreateTaskMutationVariables = {
  listId: Scalars['ID'],
  name: Scalars['String'],
  desc?: Maybe<Scalars['String']>
};


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'desc' | 'pos'>
  ) }
);

export type DeleteTaskMutationVariables = {
  taskId: Scalars['ID']
};


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTask'>
);

export type GetListTasksQueryVariables = {
  listId: Scalars['ID']
};


export type GetListTasksQuery = (
  { __typename?: 'Query' }
  & { getListTasks: Array<(
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'desc'>
  )> }
);

export type OnTaskCreatedSubscriptionVariables = {
  listId: Scalars['ID']
};


export type OnTaskCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { onTaskCreated: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'pos' | 'desc'>
  ) }
);

export type OnTaskDeletedSubscriptionVariables = {
  listId: Scalars['ID']
};


export type OnTaskDeletedSubscription = (
  { __typename?: 'Subscription' }
  & { onTaskDeleted: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'pos' | 'desc'>
  ) }
);

export type OnTaskMovedSubscriptionVariables = {
  listId: Scalars['ID']
};


export type OnTaskMovedSubscription = (
  { __typename?: 'Subscription' }
  & { onTaskMoved: (
    { __typename?: 'PublishTasksResult' }
    & { task: (
      { __typename?: 'Task' }
      & Pick<Task, 'id' | 'pos' | 'name' | 'desc'>
      & { list: (
        { __typename?: 'List' }
        & Pick<List, 'id'>
      ) }
    ), moreTasks: Maybe<Array<(
      { __typename?: 'TaskWithPosResponse' }
      & Pick<TaskWithPosResponse, 'id' | 'pos'>
    )>> }
  ) }
);

export type OnTaskUpdatedSubscriptionVariables = {
  taskId: Scalars['ID']
};


export type OnTaskUpdatedSubscription = (
  { __typename?: 'Subscription' }
  & { onTaskUpdated: (
    { __typename?: 'Task' }
    & Pick<Task, 'id' | 'name' | 'pos' | 'desc'>
  ) }
);

export type UpdateTaskMutationVariables = {
  id: Scalars['ID'],
  listId?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  dueDate?: Maybe<Scalars['DateTime']>,
  desc?: Maybe<Scalars['String']>
};


export type UpdateTaskMutation = (
  { __typename?: 'Mutation' }
  & { updateTask: (
    { __typename?: 'Task' }
    & Pick<Task, 'id'>
  ) }
);

export type UpdateTaskPosMutationVariables = {
  taskMoved: MovedTaskInput,
  moreTasks?: Maybe<Array<TaskInput>>
};


export type UpdateTaskPosMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTaskPos'>
);

export type AcceptTeamInviteLinkMutationVariables = {
  email: Scalars['String'],
  teamInviteLink: Scalars['String']
};


export type AcceptTeamInviteLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'acceptTeamInviteLink'>
);

export type CreateTeamMutationVariables = {
  name: Scalars['String']
};


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  ) }
);

export type DeleteTeamMemberMutationVariables = {
  userId: Scalars['ID'],
  teamId: Scalars['ID']
};


export type DeleteTeamMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTeamMember'>
);

export type DeleteTeamProjectMutationVariables = {
  teamId: Scalars['ID'],
  projectId: Scalars['ID']
};


export type DeleteTeamProjectMutation = (
  { __typename?: 'Mutation' }
  & { deleteTeamProject: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  ) }
);

export type GetUserTeamQueryVariables = {
  id: Scalars['ID']
};


export type GetUserTeamQuery = (
  { __typename?: 'Query' }
  & { getUserTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
    & { members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, projects: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name'>
    )> }
  ) }
);

export type GetUserTeamsQueryVariables = {};


export type GetUserTeamsQuery = (
  { __typename?: 'Query' }
  & { getUserTeams: Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  )> }
);

export type SendTeamInviteLinkMutationVariables = {
  email: Scalars['String'],
  teamId: Scalars['ID']
};


export type SendTeamInviteLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendTeamInviteLink'>
);

export type UpdateTeamMutationVariables = {
  teamId: Scalars['ID'],
  name: Scalars['String']
};


export type UpdateTeamMutation = (
  { __typename?: 'Mutation' }
  & { updateTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'id' | 'name'>
  ) }
);

export type Auth_GoogleOAuthMutationVariables = {
  code: Scalars['String']
};


export type Auth_GoogleOAuthMutation = (
  { __typename?: 'Mutation' }
  & { auth_googleOAuth: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  ) }
);

export type ChangePasswordMutationVariables = {
  currentPassword: Scalars['String'],
  newPassword: Scalars['String']
};


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changePassword'>
);

export type ForgotPasswordMutationVariables = {
  email: Scalars['String'],
  forgotPasswordLink: Scalars['String'],
  password: Scalars['String']
};


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type GetUsersByEmailQueryVariables = {
  search: Scalars['String']
};


export type GetUsersByEmailQuery = (
  { __typename?: 'Query' }
  & { getUsersByEmail: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username' | 'avatar'>
  )> }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  ) }
);

export type LoginGoogleOAuthQueryVariables = {
  returnUrl?: Maybe<Scalars['String']>
};


export type LoginGoogleOAuthQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'loginGoogleOAuth'>
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: { __typename?: 'User' }
    & UserFragment
   }
);

export type RegisterMutationVariables = {
  email: Scalars['String'],
  verificationLink: Scalars['String'],
  registerKey?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  ) }
);

export type ResendVerificationLinkMutationVariables = {
  email: Scalars['String']
};


export type ResendVerificationLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resendVerificationLink'>
);

export type SendForgotPasswordLinkMutationVariables = {
  email: Scalars['String']
};


export type SendForgotPasswordLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendForgotPasswordLink'>
);

export type SendNewEmailLinkMutationVariables = {
  email: Scalars['String']
};


export type SendNewEmailLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendNewEmailLink'>
);

export type SendVerificationLinkMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type SendVerificationLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendVerificationLink'>
);

export type UpdateEmailMutationVariables = {
  email: Scalars['String'],
  verificationLink: Scalars['String'],
  password?: Maybe<Scalars['String']>
};


export type UpdateEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateEmail'>
);

export type UpdateUsernameMutationVariables = {
  username: Scalars['String']
};


export type UpdateUsernameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateUsername'>
);

export type UploadAvatarMutationVariables = {
  image: Scalars['Upload']
};


export type UploadAvatarMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadAvatar'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'username' | 'avatar' | 'auth'>
);

export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  username
  avatar
  auth
}
    `;
export const ValidateLinkDocument = gql`
    query ValidateLink($key: String!, $link: String!) {
  validateLink(key: $key, link: $link)
}
    `;

    export function useValidateLinkQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ValidateLinkQuery, ValidateLinkQueryVariables>) {
      return ApolloReactHooks.useQuery<ValidateLinkQuery, ValidateLinkQueryVariables>(ValidateLinkDocument, baseOptions);
    }
      export function useValidateLinkLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ValidateLinkQuery, ValidateLinkQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ValidateLinkQuery, ValidateLinkQueryVariables>(ValidateLinkDocument, baseOptions);
      }
      
export type ValidateLinkQueryHookResult = ReturnType<typeof useValidateLinkQuery>;
export type ValidateLinkQueryResult = ApolloReactCommon.QueryResult<ValidateLinkQuery, ValidateLinkQueryVariables>;
export const ValidatePublicProjectLinkDocument = gql`
    query ValidatePublicProjectLink($projectId: ID!, $link: String!) {
  validatePublicProjectLink(projectId: $projectId, link: $link)
}
    `;

    export function useValidatePublicProjectLinkQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ValidatePublicProjectLinkQuery, ValidatePublicProjectLinkQueryVariables>) {
      return ApolloReactHooks.useQuery<ValidatePublicProjectLinkQuery, ValidatePublicProjectLinkQueryVariables>(ValidatePublicProjectLinkDocument, baseOptions);
    }
      export function useValidatePublicProjectLinkLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ValidatePublicProjectLinkQuery, ValidatePublicProjectLinkQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ValidatePublicProjectLinkQuery, ValidatePublicProjectLinkQueryVariables>(ValidatePublicProjectLinkDocument, baseOptions);
      }
      
export type ValidatePublicProjectLinkQueryHookResult = ReturnType<typeof useValidatePublicProjectLinkQuery>;
export type ValidatePublicProjectLinkQueryResult = ApolloReactCommon.QueryResult<ValidatePublicProjectLinkQuery, ValidatePublicProjectLinkQueryVariables>;
export const CreateListDocument = gql`
    mutation CreateList($name: String!, $projectId: ID!) {
  createList(name: $name, projectId: $projectId) {
    id
    name
  }
}
    `;
export type CreateListMutationFn = ApolloReactCommon.MutationFunction<CreateListMutation, CreateListMutationVariables>;

    export function useCreateListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, baseOptions);
    }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = ApolloReactCommon.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const DeleteListDocument = gql`
    mutation DeleteList($id: ID!) {
  deleteList(id: $id) {
    name
  }
}
    `;
export type DeleteListMutationFn = ApolloReactCommon.MutationFunction<DeleteListMutation, DeleteListMutationVariables>;

    export function useDeleteListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteListMutation, DeleteListMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, baseOptions);
    }
export type DeleteListMutationHookResult = ReturnType<typeof useDeleteListMutation>;
export type DeleteListMutationResult = ApolloReactCommon.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteListMutation, DeleteListMutationVariables>;
export const GetProjectListsAndTasksDocument = gql`
    query GetProjectListsAndTasks($projectId: ID!) {
  getProjectListsAndTasks(projectId: $projectId) {
    name
    id
    pos
    tasks {
      name
      id
      pos
      desc
    }
  }
}
    `;

    export function useGetProjectListsAndTasksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProjectListsAndTasksQuery, GetProjectListsAndTasksQueryVariables>) {
      return ApolloReactHooks.useQuery<GetProjectListsAndTasksQuery, GetProjectListsAndTasksQueryVariables>(GetProjectListsAndTasksDocument, baseOptions);
    }
      export function useGetProjectListsAndTasksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProjectListsAndTasksQuery, GetProjectListsAndTasksQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetProjectListsAndTasksQuery, GetProjectListsAndTasksQueryVariables>(GetProjectListsAndTasksDocument, baseOptions);
      }
      
export type GetProjectListsAndTasksQueryHookResult = ReturnType<typeof useGetProjectListsAndTasksQuery>;
export type GetProjectListsAndTasksQueryResult = ApolloReactCommon.QueryResult<GetProjectListsAndTasksQuery, GetProjectListsAndTasksQueryVariables>;
export const OnListCreatedDocument = gql`
    subscription OnListCreated($projectId: ID!) {
  onListCreated(projectId: $projectId) {
    name
    id
    pos
    tasks {
      name
    }
  }
}
    `;

    export function useOnListCreatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnListCreatedSubscription, OnListCreatedSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<OnListCreatedSubscription, OnListCreatedSubscriptionVariables>(OnListCreatedDocument, baseOptions);
    }
export type OnListCreatedSubscriptionHookResult = ReturnType<typeof useOnListCreatedSubscription>;
export type OnListCreatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnListCreatedSubscription>;
export const OnListDeletedDocument = gql`
    subscription OnListDeleted($projectId: ID!) {
  onListDeleted(projectId: $projectId) {
    name
    id
    pos
  }
}
    `;

    export function useOnListDeletedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnListDeletedSubscription, OnListDeletedSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<OnListDeletedSubscription, OnListDeletedSubscriptionVariables>(OnListDeletedDocument, baseOptions);
    }
export type OnListDeletedSubscriptionHookResult = ReturnType<typeof useOnListDeletedSubscription>;
export type OnListDeletedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnListDeletedSubscription>;
export const OnListMovedDocument = gql`
    subscription OnListMoved($projectId: ID!) {
  onListMoved(projectId: $projectId) {
    id
    name
    pos
  }
}
    `;

    export function useOnListMovedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnListMovedSubscription, OnListMovedSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<OnListMovedSubscription, OnListMovedSubscriptionVariables>(OnListMovedDocument, baseOptions);
    }
export type OnListMovedSubscriptionHookResult = ReturnType<typeof useOnListMovedSubscription>;
export type OnListMovedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnListMovedSubscription>;
export const OnListUpdatedDocument = gql`
    subscription OnListUpdated($projectId: ID!) {
  onListUpdated(projectId: $projectId) {
    id
    name
    pos
  }
}
    `;

    export function useOnListUpdatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnListUpdatedSubscription, OnListUpdatedSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<OnListUpdatedSubscription, OnListUpdatedSubscriptionVariables>(OnListUpdatedDocument, baseOptions);
    }
export type OnListUpdatedSubscriptionHookResult = ReturnType<typeof useOnListUpdatedSubscription>;
export type OnListUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnListUpdatedSubscription>;
export const UpdateListNameDocument = gql`
    mutation UpdateListName($name: String!, $id: ID!) {
  updateListName(name: $name, id: $id)
}
    `;
export type UpdateListNameMutationFn = ApolloReactCommon.MutationFunction<UpdateListNameMutation, UpdateListNameMutationVariables>;

    export function useUpdateListNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateListNameMutation, UpdateListNameMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateListNameMutation, UpdateListNameMutationVariables>(UpdateListNameDocument, baseOptions);
    }
export type UpdateListNameMutationHookResult = ReturnType<typeof useUpdateListNameMutation>;
export type UpdateListNameMutationResult = ApolloReactCommon.MutationResult<UpdateListNameMutation>;
export type UpdateListNameMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateListNameMutation, UpdateListNameMutationVariables>;
export const UpdateListPosDocument = gql`
    mutation UpdateListPos($id: ID!, $aboveId: ID, $belowId: ID) {
  updateListPos(id: $id, aboveId: $aboveId, belowId: $belowId) {
    id
    pos
  }
}
    `;
export type UpdateListPosMutationFn = ApolloReactCommon.MutationFunction<UpdateListPosMutation, UpdateListPosMutationVariables>;

    export function useUpdateListPosMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateListPosMutation, UpdateListPosMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateListPosMutation, UpdateListPosMutationVariables>(UpdateListPosDocument, baseOptions);
    }
export type UpdateListPosMutationHookResult = ReturnType<typeof useUpdateListPosMutation>;
export type UpdateListPosMutationResult = ApolloReactCommon.MutationResult<UpdateListPosMutation>;
export type UpdateListPosMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateListPosMutation, UpdateListPosMutationVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications {
  getNotifications {
    id
    userId
    type
    read
  }
}
    `;

    export function useGetNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
      return ApolloReactHooks.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, baseOptions);
    }
      export function useGetNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, baseOptions);
      }
      
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsQueryResult = ApolloReactCommon.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const NewNotificationDocument = gql`
    subscription NewNotification($userId: ID!) {
  newNotification(userId: $userId) {
    id
    date
    userId
    type
    read
  }
}
    `;

    export function useNewNotificationSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<NewNotificationSubscription, NewNotificationSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<NewNotificationSubscription, NewNotificationSubscriptionVariables>(NewNotificationDocument, baseOptions);
    }
export type NewNotificationSubscriptionHookResult = ReturnType<typeof useNewNotificationSubscription>;
export type NewNotificationSubscriptionResult = ApolloReactCommon.SubscriptionResult<NewNotificationSubscription>;
export const AcceptProjectInviteLinkDocument = gql`
    mutation AcceptProjectInviteLink($email: String!, $id: ID!, $projectInviteLink: String!) {
  acceptProjectInviteLink(email: $email, id: $id, projectInviteLink: $projectInviteLink)
}
    `;
export type AcceptProjectInviteLinkMutationFn = ApolloReactCommon.MutationFunction<AcceptProjectInviteLinkMutation, AcceptProjectInviteLinkMutationVariables>;

    export function useAcceptProjectInviteLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptProjectInviteLinkMutation, AcceptProjectInviteLinkMutationVariables>) {
      return ApolloReactHooks.useMutation<AcceptProjectInviteLinkMutation, AcceptProjectInviteLinkMutationVariables>(AcceptProjectInviteLinkDocument, baseOptions);
    }
export type AcceptProjectInviteLinkMutationHookResult = ReturnType<typeof useAcceptProjectInviteLinkMutation>;
export type AcceptProjectInviteLinkMutationResult = ApolloReactCommon.MutationResult<AcceptProjectInviteLinkMutation>;
export type AcceptProjectInviteLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptProjectInviteLinkMutation, AcceptProjectInviteLinkMutationVariables>;
export const AcceptPublicProjectLinkDocument = gql`
    mutation AcceptPublicProjectLink($link: String!, $projectId: ID!) {
  acceptPublicProjectLink(link: $link, projectId: $projectId)
}
    `;
export type AcceptPublicProjectLinkMutationFn = ApolloReactCommon.MutationFunction<AcceptPublicProjectLinkMutation, AcceptPublicProjectLinkMutationVariables>;

    export function useAcceptPublicProjectLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptPublicProjectLinkMutation, AcceptPublicProjectLinkMutationVariables>) {
      return ApolloReactHooks.useMutation<AcceptPublicProjectLinkMutation, AcceptPublicProjectLinkMutationVariables>(AcceptPublicProjectLinkDocument, baseOptions);
    }
export type AcceptPublicProjectLinkMutationHookResult = ReturnType<typeof useAcceptPublicProjectLinkMutation>;
export type AcceptPublicProjectLinkMutationResult = ApolloReactCommon.MutationResult<AcceptPublicProjectLinkMutation>;
export type AcceptPublicProjectLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptPublicProjectLinkMutation, AcceptPublicProjectLinkMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($name: String!, $desc: String) {
  createProject(name: $name, desc: $desc) {
    id
    name
  }
}
    `;
export type CreateProjectMutationFn = ApolloReactCommon.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

    export function useCreateProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, baseOptions);
    }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = ApolloReactCommon.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const GetProjectInvitesDocument = gql`
    query GetProjectInvites($projectId: ID!) {
  getProjectInvites(projectId: $projectId) {
    email
    avatar
  }
}
    `;

    export function useGetProjectInvitesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProjectInvitesQuery, GetProjectInvitesQueryVariables>) {
      return ApolloReactHooks.useQuery<GetProjectInvitesQuery, GetProjectInvitesQueryVariables>(GetProjectInvitesDocument, baseOptions);
    }
      export function useGetProjectInvitesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProjectInvitesQuery, GetProjectInvitesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetProjectInvitesQuery, GetProjectInvitesQueryVariables>(GetProjectInvitesDocument, baseOptions);
      }
      
export type GetProjectInvitesQueryHookResult = ReturnType<typeof useGetProjectInvitesQuery>;
export type GetProjectInvitesQueryResult = ApolloReactCommon.QueryResult<GetProjectInvitesQuery, GetProjectInvitesQueryVariables>;
export const GetPublicProjectLinkDocument = gql`
    query GetPublicProjectLink($projectId: ID!) {
  getPublicProjectLink(projectId: $projectId)
}
    `;

    export function useGetPublicProjectLinkQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPublicProjectLinkQuery, GetPublicProjectLinkQueryVariables>) {
      return ApolloReactHooks.useQuery<GetPublicProjectLinkQuery, GetPublicProjectLinkQueryVariables>(GetPublicProjectLinkDocument, baseOptions);
    }
      export function useGetPublicProjectLinkLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPublicProjectLinkQuery, GetPublicProjectLinkQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetPublicProjectLinkQuery, GetPublicProjectLinkQueryVariables>(GetPublicProjectLinkDocument, baseOptions);
      }
      
export type GetPublicProjectLinkQueryHookResult = ReturnType<typeof useGetPublicProjectLinkQuery>;
export type GetPublicProjectLinkQueryResult = ApolloReactCommon.QueryResult<GetPublicProjectLinkQuery, GetPublicProjectLinkQueryVariables>;
export const GetUserProjectDocument = gql`
    query GetUserProject($id: ID!) {
  getUserProject(id: $id) {
    id
    name
    members {
      ...User
    }
    owner {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

    export function useGetUserProjectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserProjectQuery, GetUserProjectQueryVariables>) {
      return ApolloReactHooks.useQuery<GetUserProjectQuery, GetUserProjectQueryVariables>(GetUserProjectDocument, baseOptions);
    }
      export function useGetUserProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserProjectQuery, GetUserProjectQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetUserProjectQuery, GetUserProjectQueryVariables>(GetUserProjectDocument, baseOptions);
      }
      
export type GetUserProjectQueryHookResult = ReturnType<typeof useGetUserProjectQuery>;
export type GetUserProjectQueryResult = ApolloReactCommon.QueryResult<GetUserProjectQuery, GetUserProjectQueryVariables>;
export const GetUserProjectsDocument = gql`
    query GetUserProjects {
  getUserProjects {
    id
    name
    desc
    owner {
      id
      email
      username
      avatar
    }
    members {
      id
      email
      username
      avatar
    }
  }
}
    `;

    export function useGetUserProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
      return ApolloReactHooks.useQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, baseOptions);
    }
      export function useGetUserProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserProjectsQuery, GetUserProjectsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetUserProjectsQuery, GetUserProjectsQueryVariables>(GetUserProjectsDocument, baseOptions);
      }
      
export type GetUserProjectsQueryHookResult = ReturnType<typeof useGetUserProjectsQuery>;
export type GetUserProjectsQueryResult = ApolloReactCommon.QueryResult<GetUserProjectsQuery, GetUserProjectsQueryVariables>;
export const OnAcceptProjectInviteDocument = gql`
    subscription OnAcceptProjectInvite($projectId: ID!) {
  onAcceptProjectInvite(projectId: $projectId) {
    ...User
  }
}
    ${UserFragmentDoc}`;

    export function useOnAcceptProjectInviteSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnAcceptProjectInviteSubscription, OnAcceptProjectInviteSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<OnAcceptProjectInviteSubscription, OnAcceptProjectInviteSubscriptionVariables>(OnAcceptProjectInviteDocument, baseOptions);
    }
export type OnAcceptProjectInviteSubscriptionHookResult = ReturnType<typeof useOnAcceptProjectInviteSubscription>;
export type OnAcceptProjectInviteSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnAcceptProjectInviteSubscription>;
export const OnSendProjectInviteDocument = gql`
    subscription OnSendProjectInvite($projectId: ID!) {
  onSendProjectInvite(projectId: $projectId) {
    email
    avatar
  }
}
    `;

    export function useOnSendProjectInviteSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnSendProjectInviteSubscription, OnSendProjectInviteSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<OnSendProjectInviteSubscription, OnSendProjectInviteSubscriptionVariables>(OnSendProjectInviteDocument, baseOptions);
    }
export type OnSendProjectInviteSubscriptionHookResult = ReturnType<typeof useOnSendProjectInviteSubscription>;
export type OnSendProjectInviteSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnSendProjectInviteSubscription>;
export const SendProjectInviteLinkDocument = gql`
    mutation SendProjectInviteLink($emails: [String!]!, $projectId: ID!, $message: String) {
  sendProjectInviteLink(emails: $emails, projectId: $projectId, message: $message)
}
    `;
export type SendProjectInviteLinkMutationFn = ApolloReactCommon.MutationFunction<SendProjectInviteLinkMutation, SendProjectInviteLinkMutationVariables>;

    export function useSendProjectInviteLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendProjectInviteLinkMutation, SendProjectInviteLinkMutationVariables>) {
      return ApolloReactHooks.useMutation<SendProjectInviteLinkMutation, SendProjectInviteLinkMutationVariables>(SendProjectInviteLinkDocument, baseOptions);
    }
export type SendProjectInviteLinkMutationHookResult = ReturnType<typeof useSendProjectInviteLinkMutation>;
export type SendProjectInviteLinkMutationResult = ApolloReactCommon.MutationResult<SendProjectInviteLinkMutation>;
export type SendProjectInviteLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<SendProjectInviteLinkMutation, SendProjectInviteLinkMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($listId: ID!, $name: String!, $desc: String) {
  createTask(listId: $listId, name: $name, desc: $desc) {
    id
    name
    desc
    pos
  }
}
    `;
export type CreateTaskMutationFn = ApolloReactCommon.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

    export function useCreateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, baseOptions);
    }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = ApolloReactCommon.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($taskId: ID!) {
  deleteTask(taskId: $taskId)
}
    `;
export type DeleteTaskMutationFn = ApolloReactCommon.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

    export function useDeleteTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, baseOptions);
    }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = ApolloReactCommon.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetListTasksDocument = gql`
    query GetListTasks($listId: ID!) {
  getListTasks(listId: $listId) {
    id
    name
    desc
  }
}
    `;

    export function useGetListTasksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetListTasksQuery, GetListTasksQueryVariables>) {
      return ApolloReactHooks.useQuery<GetListTasksQuery, GetListTasksQueryVariables>(GetListTasksDocument, baseOptions);
    }
      export function useGetListTasksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetListTasksQuery, GetListTasksQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetListTasksQuery, GetListTasksQueryVariables>(GetListTasksDocument, baseOptions);
      }
      
export type GetListTasksQueryHookResult = ReturnType<typeof useGetListTasksQuery>;
export type GetListTasksQueryResult = ApolloReactCommon.QueryResult<GetListTasksQuery, GetListTasksQueryVariables>;
export const OnTaskCreatedDocument = gql`
    subscription OnTaskCreated($listId: ID!) {
  onTaskCreated(listId: $listId) {
    id
    name
    pos
    desc
  }
}
    `;

    export function useOnTaskCreatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnTaskCreatedSubscription, OnTaskCreatedSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<OnTaskCreatedSubscription, OnTaskCreatedSubscriptionVariables>(OnTaskCreatedDocument, baseOptions);
    }
export type OnTaskCreatedSubscriptionHookResult = ReturnType<typeof useOnTaskCreatedSubscription>;
export type OnTaskCreatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnTaskCreatedSubscription>;
export const OnTaskDeletedDocument = gql`
    subscription OnTaskDeleted($listId: ID!) {
  onTaskDeleted(listId: $listId) {
    id
    name
    pos
    desc
  }
}
    `;

    export function useOnTaskDeletedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnTaskDeletedSubscription, OnTaskDeletedSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<OnTaskDeletedSubscription, OnTaskDeletedSubscriptionVariables>(OnTaskDeletedDocument, baseOptions);
    }
export type OnTaskDeletedSubscriptionHookResult = ReturnType<typeof useOnTaskDeletedSubscription>;
export type OnTaskDeletedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnTaskDeletedSubscription>;
export const OnTaskMovedDocument = gql`
    subscription OnTaskMoved($listId: ID!) {
  onTaskMoved(listId: $listId) {
    task {
      id
      pos
      name
      desc
      list {
        id
      }
    }
    moreTasks {
      id
      pos
    }
  }
}
    `;

    export function useOnTaskMovedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnTaskMovedSubscription, OnTaskMovedSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<OnTaskMovedSubscription, OnTaskMovedSubscriptionVariables>(OnTaskMovedDocument, baseOptions);
    }
export type OnTaskMovedSubscriptionHookResult = ReturnType<typeof useOnTaskMovedSubscription>;
export type OnTaskMovedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnTaskMovedSubscription>;
export const OnTaskUpdatedDocument = gql`
    subscription OnTaskUpdated($taskId: ID!) {
  onTaskUpdated(taskId: $taskId) {
    id
    name
    pos
    desc
  }
}
    `;

    export function useOnTaskUpdatedSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnTaskUpdatedSubscription, OnTaskUpdatedSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<OnTaskUpdatedSubscription, OnTaskUpdatedSubscriptionVariables>(OnTaskUpdatedDocument, baseOptions);
    }
export type OnTaskUpdatedSubscriptionHookResult = ReturnType<typeof useOnTaskUpdatedSubscription>;
export type OnTaskUpdatedSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnTaskUpdatedSubscription>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: ID!, $listId: ID, $name: String, $dueDate: DateTime, $desc: String) {
  updateTask(id: $id, listId: $listId, name: $name, dueDate: $dueDate, desc: $desc) {
    id
  }
}
    `;
export type UpdateTaskMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

    export function useUpdateTaskMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, baseOptions);
    }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = ApolloReactCommon.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UpdateTaskPosDocument = gql`
    mutation UpdateTaskPos($taskMoved: MovedTaskInput!, $moreTasks: [TaskInput!]) {
  updateTaskPos(taskMoved: $taskMoved, moreTasks: $moreTasks)
}
    `;
export type UpdateTaskPosMutationFn = ApolloReactCommon.MutationFunction<UpdateTaskPosMutation, UpdateTaskPosMutationVariables>;

    export function useUpdateTaskPosMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTaskPosMutation, UpdateTaskPosMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateTaskPosMutation, UpdateTaskPosMutationVariables>(UpdateTaskPosDocument, baseOptions);
    }
export type UpdateTaskPosMutationHookResult = ReturnType<typeof useUpdateTaskPosMutation>;
export type UpdateTaskPosMutationResult = ApolloReactCommon.MutationResult<UpdateTaskPosMutation>;
export type UpdateTaskPosMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTaskPosMutation, UpdateTaskPosMutationVariables>;
export const AcceptTeamInviteLinkDocument = gql`
    mutation AcceptTeamInviteLink($email: String!, $teamInviteLink: String!) {
  acceptTeamInviteLink(email: $email, teamInviteLink: $teamInviteLink)
}
    `;
export type AcceptTeamInviteLinkMutationFn = ApolloReactCommon.MutationFunction<AcceptTeamInviteLinkMutation, AcceptTeamInviteLinkMutationVariables>;

    export function useAcceptTeamInviteLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptTeamInviteLinkMutation, AcceptTeamInviteLinkMutationVariables>) {
      return ApolloReactHooks.useMutation<AcceptTeamInviteLinkMutation, AcceptTeamInviteLinkMutationVariables>(AcceptTeamInviteLinkDocument, baseOptions);
    }
export type AcceptTeamInviteLinkMutationHookResult = ReturnType<typeof useAcceptTeamInviteLinkMutation>;
export type AcceptTeamInviteLinkMutationResult = ApolloReactCommon.MutationResult<AcceptTeamInviteLinkMutation>;
export type AcceptTeamInviteLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<AcceptTeamInviteLinkMutation, AcceptTeamInviteLinkMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!) {
  createTeam(name: $name) {
    id
    name
  }
}
    `;
export type CreateTeamMutationFn = ApolloReactCommon.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

    export function useCreateTeamMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, baseOptions);
    }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = ApolloReactCommon.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const DeleteTeamMemberDocument = gql`
    mutation DeleteTeamMember($userId: ID!, $teamId: ID!) {
  deleteTeamMember(userId: $userId, teamId: $teamId)
}
    `;
export type DeleteTeamMemberMutationFn = ApolloReactCommon.MutationFunction<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>;

    export function useDeleteTeamMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>(DeleteTeamMemberDocument, baseOptions);
    }
export type DeleteTeamMemberMutationHookResult = ReturnType<typeof useDeleteTeamMemberMutation>;
export type DeleteTeamMemberMutationResult = ApolloReactCommon.MutationResult<DeleteTeamMemberMutation>;
export type DeleteTeamMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTeamMemberMutation, DeleteTeamMemberMutationVariables>;
export const DeleteTeamProjectDocument = gql`
    mutation DeleteTeamProject($teamId: ID!, $projectId: ID!) {
  deleteTeamProject(teamId: $teamId, projectId: $projectId) {
    id
    name
  }
}
    `;
export type DeleteTeamProjectMutationFn = ApolloReactCommon.MutationFunction<DeleteTeamProjectMutation, DeleteTeamProjectMutationVariables>;

    export function useDeleteTeamProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTeamProjectMutation, DeleteTeamProjectMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteTeamProjectMutation, DeleteTeamProjectMutationVariables>(DeleteTeamProjectDocument, baseOptions);
    }
export type DeleteTeamProjectMutationHookResult = ReturnType<typeof useDeleteTeamProjectMutation>;
export type DeleteTeamProjectMutationResult = ApolloReactCommon.MutationResult<DeleteTeamProjectMutation>;
export type DeleteTeamProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTeamProjectMutation, DeleteTeamProjectMutationVariables>;
export const GetUserTeamDocument = gql`
    query GetUserTeam($id: ID!) {
  getUserTeam(id: $id) {
    id
    name
    members {
      id
      username
    }
    projects {
      id
      name
    }
  }
}
    `;

    export function useGetUserTeamQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserTeamQuery, GetUserTeamQueryVariables>) {
      return ApolloReactHooks.useQuery<GetUserTeamQuery, GetUserTeamQueryVariables>(GetUserTeamDocument, baseOptions);
    }
      export function useGetUserTeamLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserTeamQuery, GetUserTeamQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetUserTeamQuery, GetUserTeamQueryVariables>(GetUserTeamDocument, baseOptions);
      }
      
export type GetUserTeamQueryHookResult = ReturnType<typeof useGetUserTeamQuery>;
export type GetUserTeamQueryResult = ApolloReactCommon.QueryResult<GetUserTeamQuery, GetUserTeamQueryVariables>;
export const GetUserTeamsDocument = gql`
    query GetUserTeams {
  getUserTeams {
    id
    name
  }
}
    `;

    export function useGetUserTeamsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserTeamsQuery, GetUserTeamsQueryVariables>) {
      return ApolloReactHooks.useQuery<GetUserTeamsQuery, GetUserTeamsQueryVariables>(GetUserTeamsDocument, baseOptions);
    }
      export function useGetUserTeamsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserTeamsQuery, GetUserTeamsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetUserTeamsQuery, GetUserTeamsQueryVariables>(GetUserTeamsDocument, baseOptions);
      }
      
export type GetUserTeamsQueryHookResult = ReturnType<typeof useGetUserTeamsQuery>;
export type GetUserTeamsQueryResult = ApolloReactCommon.QueryResult<GetUserTeamsQuery, GetUserTeamsQueryVariables>;
export const SendTeamInviteLinkDocument = gql`
    mutation SendTeamInviteLink($email: String!, $teamId: ID!) {
  sendTeamInviteLink(email: $email, teamId: $teamId)
}
    `;
export type SendTeamInviteLinkMutationFn = ApolloReactCommon.MutationFunction<SendTeamInviteLinkMutation, SendTeamInviteLinkMutationVariables>;

    export function useSendTeamInviteLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendTeamInviteLinkMutation, SendTeamInviteLinkMutationVariables>) {
      return ApolloReactHooks.useMutation<SendTeamInviteLinkMutation, SendTeamInviteLinkMutationVariables>(SendTeamInviteLinkDocument, baseOptions);
    }
export type SendTeamInviteLinkMutationHookResult = ReturnType<typeof useSendTeamInviteLinkMutation>;
export type SendTeamInviteLinkMutationResult = ApolloReactCommon.MutationResult<SendTeamInviteLinkMutation>;
export type SendTeamInviteLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<SendTeamInviteLinkMutation, SendTeamInviteLinkMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($teamId: ID!, $name: String!) {
  updateTeam(teamId: $teamId, name: $name) {
    id
    name
  }
}
    `;
export type UpdateTeamMutationFn = ApolloReactCommon.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

    export function useUpdateTeamMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, baseOptions);
    }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = ApolloReactCommon.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const Auth_GoogleOAuthDocument = gql`
    mutation Auth_GoogleOAuth($code: String!) {
  auth_googleOAuth(code: $code) {
    accessToken
  }
}
    `;
export type Auth_GoogleOAuthMutationFn = ApolloReactCommon.MutationFunction<Auth_GoogleOAuthMutation, Auth_GoogleOAuthMutationVariables>;

    export function useAuth_GoogleOAuthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Auth_GoogleOAuthMutation, Auth_GoogleOAuthMutationVariables>) {
      return ApolloReactHooks.useMutation<Auth_GoogleOAuthMutation, Auth_GoogleOAuthMutationVariables>(Auth_GoogleOAuthDocument, baseOptions);
    }
export type Auth_GoogleOAuthMutationHookResult = ReturnType<typeof useAuth_GoogleOAuthMutation>;
export type Auth_GoogleOAuthMutationResult = ApolloReactCommon.MutationResult<Auth_GoogleOAuthMutation>;
export type Auth_GoogleOAuthMutationOptions = ApolloReactCommon.BaseMutationOptions<Auth_GoogleOAuthMutation, Auth_GoogleOAuthMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
}
    `;
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

    export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
      return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
    }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!, $forgotPasswordLink: String!, $password: String!) {
  forgotPassword(email: $email, forgotPasswordLink: $forgotPasswordLink, password: $password)
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

    export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
      return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
    }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetUsersByEmailDocument = gql`
    query GetUsersByEmail($search: String!) {
  getUsersByEmail(search: $search) {
    id
    email
    username
    avatar
  }
}
    `;

    export function useGetUsersByEmailQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>) {
      return ApolloReactHooks.useQuery<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>(GetUsersByEmailDocument, baseOptions);
    }
      export function useGetUsersByEmailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>(GetUsersByEmailDocument, baseOptions);
      }
      
export type GetUsersByEmailQueryHookResult = ReturnType<typeof useGetUsersByEmailQuery>;
export type GetUsersByEmailQueryResult = ApolloReactCommon.QueryResult<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

    export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
      return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
    }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LoginGoogleOAuthDocument = gql`
    query LoginGoogleOAuth($returnUrl: String) {
  loginGoogleOAuth(returnUrl: $returnUrl)
}
    `;

    export function useLoginGoogleOAuthQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LoginGoogleOAuthQuery, LoginGoogleOAuthQueryVariables>) {
      return ApolloReactHooks.useQuery<LoginGoogleOAuthQuery, LoginGoogleOAuthQueryVariables>(LoginGoogleOAuthDocument, baseOptions);
    }
      export function useLoginGoogleOAuthLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoginGoogleOAuthQuery, LoginGoogleOAuthQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<LoginGoogleOAuthQuery, LoginGoogleOAuthQueryVariables>(LoginGoogleOAuthDocument, baseOptions);
      }
      
export type LoginGoogleOAuthQueryHookResult = ReturnType<typeof useLoginGoogleOAuthQuery>;
export type LoginGoogleOAuthQueryResult = ApolloReactCommon.QueryResult<LoginGoogleOAuthQuery, LoginGoogleOAuthQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

    export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
      return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
    }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;

    export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
      return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
    }
      export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
      
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $verificationLink: String!, $registerKey: String, $password: String) {
  register(email: $email, verificationLink: $verificationLink, registerKey: $registerKey, password: $password) {
    accessToken
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

    export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
      return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
    }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResendVerificationLinkDocument = gql`
    mutation ResendVerificationLink($email: String!) {
  resendVerificationLink(email: $email)
}
    `;
export type ResendVerificationLinkMutationFn = ApolloReactCommon.MutationFunction<ResendVerificationLinkMutation, ResendVerificationLinkMutationVariables>;

    export function useResendVerificationLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResendVerificationLinkMutation, ResendVerificationLinkMutationVariables>) {
      return ApolloReactHooks.useMutation<ResendVerificationLinkMutation, ResendVerificationLinkMutationVariables>(ResendVerificationLinkDocument, baseOptions);
    }
export type ResendVerificationLinkMutationHookResult = ReturnType<typeof useResendVerificationLinkMutation>;
export type ResendVerificationLinkMutationResult = ApolloReactCommon.MutationResult<ResendVerificationLinkMutation>;
export type ResendVerificationLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<ResendVerificationLinkMutation, ResendVerificationLinkMutationVariables>;
export const SendForgotPasswordLinkDocument = gql`
    mutation SendForgotPasswordLink($email: String!) {
  sendForgotPasswordLink(email: $email)
}
    `;
export type SendForgotPasswordLinkMutationFn = ApolloReactCommon.MutationFunction<SendForgotPasswordLinkMutation, SendForgotPasswordLinkMutationVariables>;

    export function useSendForgotPasswordLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendForgotPasswordLinkMutation, SendForgotPasswordLinkMutationVariables>) {
      return ApolloReactHooks.useMutation<SendForgotPasswordLinkMutation, SendForgotPasswordLinkMutationVariables>(SendForgotPasswordLinkDocument, baseOptions);
    }
export type SendForgotPasswordLinkMutationHookResult = ReturnType<typeof useSendForgotPasswordLinkMutation>;
export type SendForgotPasswordLinkMutationResult = ApolloReactCommon.MutationResult<SendForgotPasswordLinkMutation>;
export type SendForgotPasswordLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<SendForgotPasswordLinkMutation, SendForgotPasswordLinkMutationVariables>;
export const SendNewEmailLinkDocument = gql`
    mutation SendNewEmailLink($email: String!) {
  sendNewEmailLink(email: $email)
}
    `;
export type SendNewEmailLinkMutationFn = ApolloReactCommon.MutationFunction<SendNewEmailLinkMutation, SendNewEmailLinkMutationVariables>;

    export function useSendNewEmailLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendNewEmailLinkMutation, SendNewEmailLinkMutationVariables>) {
      return ApolloReactHooks.useMutation<SendNewEmailLinkMutation, SendNewEmailLinkMutationVariables>(SendNewEmailLinkDocument, baseOptions);
    }
export type SendNewEmailLinkMutationHookResult = ReturnType<typeof useSendNewEmailLinkMutation>;
export type SendNewEmailLinkMutationResult = ApolloReactCommon.MutationResult<SendNewEmailLinkMutation>;
export type SendNewEmailLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<SendNewEmailLinkMutation, SendNewEmailLinkMutationVariables>;
export const SendVerificationLinkDocument = gql`
    mutation SendVerificationLink($email: String!, $password: String!) {
  sendVerificationLink(email: $email, password: $password)
}
    `;
export type SendVerificationLinkMutationFn = ApolloReactCommon.MutationFunction<SendVerificationLinkMutation, SendVerificationLinkMutationVariables>;

    export function useSendVerificationLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendVerificationLinkMutation, SendVerificationLinkMutationVariables>) {
      return ApolloReactHooks.useMutation<SendVerificationLinkMutation, SendVerificationLinkMutationVariables>(SendVerificationLinkDocument, baseOptions);
    }
export type SendVerificationLinkMutationHookResult = ReturnType<typeof useSendVerificationLinkMutation>;
export type SendVerificationLinkMutationResult = ApolloReactCommon.MutationResult<SendVerificationLinkMutation>;
export type SendVerificationLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<SendVerificationLinkMutation, SendVerificationLinkMutationVariables>;
export const UpdateEmailDocument = gql`
    mutation UpdateEmail($email: String!, $verificationLink: String!, $password: String) {
  updateEmail(email: $email, verificationLink: $verificationLink, password: $password)
}
    `;
export type UpdateEmailMutationFn = ApolloReactCommon.MutationFunction<UpdateEmailMutation, UpdateEmailMutationVariables>;

    export function useUpdateEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEmailMutation, UpdateEmailMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(UpdateEmailDocument, baseOptions);
    }
export type UpdateEmailMutationHookResult = ReturnType<typeof useUpdateEmailMutation>;
export type UpdateEmailMutationResult = ApolloReactCommon.MutationResult<UpdateEmailMutation>;
export type UpdateEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateEmailMutation, UpdateEmailMutationVariables>;
export const UpdateUsernameDocument = gql`
    mutation UpdateUsername($username: String!) {
  updateUsername(username: $username)
}
    `;
export type UpdateUsernameMutationFn = ApolloReactCommon.MutationFunction<UpdateUsernameMutation, UpdateUsernameMutationVariables>;

    export function useUpdateUsernameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>) {
      return ApolloReactHooks.useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(UpdateUsernameDocument, baseOptions);
    }
export type UpdateUsernameMutationHookResult = ReturnType<typeof useUpdateUsernameMutation>;
export type UpdateUsernameMutationResult = ApolloReactCommon.MutationResult<UpdateUsernameMutation>;
export type UpdateUsernameMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const UploadAvatarDocument = gql`
    mutation UploadAvatar($image: Upload!) {
  uploadAvatar(image: $image)
}
    `;
export type UploadAvatarMutationFn = ApolloReactCommon.MutationFunction<UploadAvatarMutation, UploadAvatarMutationVariables>;

    export function useUploadAvatarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadAvatarMutation, UploadAvatarMutationVariables>) {
      return ApolloReactHooks.useMutation<UploadAvatarMutation, UploadAvatarMutationVariables>(UploadAvatarDocument, baseOptions);
    }
export type UploadAvatarMutationHookResult = ReturnType<typeof useUploadAvatarMutation>;
export type UploadAvatarMutationResult = ApolloReactCommon.MutationResult<UploadAvatarMutation>;
export type UploadAvatarMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadAvatarMutation, UploadAvatarMutationVariables>;