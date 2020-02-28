import React from 'react';
import { render, mount } from 'enzyme';
import TeamPage from '../../pages/team';
import { MemoryRouter, Route, Switch } from 'react-router';
import * as HashFactory from '../../lib/hashids';
import { MockedProvider, wait } from '@apollo/react-testing';
import {
  GetUserTeamDocument,
  UpdateTeamDocument,
  DeleteTeamProjectDocument,
  DeleteTeamMemberDocument
} from '../../generated/graphql';
import { act } from 'react-dom/test-utils';
import ProjectPage from '../../pages/project';

describe('Pages', () => {
  describe('Team', () => {
    jest.spyOn(HashFactory, 'decode').mockImplementation((_id: string) => '1');

    const routerLocation = {
      pathname: '/team/teamId/teamName',
      teamId: 'teamId',
      teamName: 'teamName'
    };

    const mockQuery = {
      id: HashFactory.decode(routerLocation.teamId),
      name: routerLocation.teamName,
      newName: 'newTeamName',
      projectId: 'projectId',
      projectName: 'project-01',
      memberId: 'memberId',
      memberName: 'member-02'
    };

    it('should render and call getUserTeamQuery', async () => {
      let getUserTeamQueryCalled = false;
      const getUserTeamQuery = {
        request: {
          query: GetUserTeamDocument,
          variables: { id: mockQuery.id }
        },
        result: () => {
          getUserTeamQueryCalled = true;
          return {
            data: {
              getUserTeam: {
                id: mockQuery.id,
                name: mockQuery.name,
                members: [
                  {
                    id: 1,
                    username: 'dev'
                  }
                ],
                projects: [
                  {
                    id: mockQuery.projectId,
                    name: mockQuery.projectName
                  }
                ]
              }
            }
          };
        }
      };
      render(
        <MockedProvider mocks={[getUserTeamQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation.pathname]}>
            <Route
              exact
              path={'/team/:teamId/:teamName'}
              render={() => <TeamPage />}
              // component={TeamPage}
            />
          </MemoryRouter>
        </MockedProvider>
      );
      await act(async () => {
        await wait(10);
      });
      expect(getUserTeamQueryCalled).toBe(true);
    });

    it('should mutate and call useUpdateTeamMutation', async () => {
      let useUpdateTeamMutationCalled = false;
      let getUserTeamQueryCalled = false;
      const updateTeamMutation = {
        request: {
          query: UpdateTeamDocument,
          variables: {
            teamId: mockQuery.id,
            name: mockQuery.newName
          }
        },
        result: () => {
          useUpdateTeamMutationCalled = true;
          return {
            data: {
              updateTeam: {
                id: mockQuery.id,
                name: mockQuery.newName
              }
            }
          };
        }
      };

      const getUserTeamQuery = {
        request: {
          query: GetUserTeamDocument,
          variables: { id: mockQuery.id }
        },
        result: () => {
          getUserTeamQueryCalled = true;
          return {
            data: {
              getUserTeam: {
                id: mockQuery.id,
                name: mockQuery.name,
                members: [
                  {
                    id: 1,
                    username: 'dev'
                  }
                ],
                projects: [
                  {
                    id: mockQuery.projectId,
                    name: mockQuery.projectName
                  }
                ]
              }
            }
          };
        }
      };
      const wrapper = mount(
        <MockedProvider
          mocks={[getUserTeamQuery, updateTeamMutation, getUserTeamQuery]}
          addTypename={false}
        >
          <MemoryRouter initialEntries={[routerLocation.pathname]}>
            <Route
              exact
              path={'/team/:teamId/:teamName'}
              render={() => <TeamPage />}
              // component={TeamPage}
            />
          </MemoryRouter>
        </MockedProvider>
      );
      await act(async () => {
        await wait(0);

        wrapper.update();
        wrapper.find('input#teamName').simulate('change', {
          target: { name: 'teamName', value: mockQuery.newName }
        });
        wrapper.find('form').simulate('submit');

        await wait(0);
      });
      expect(getUserTeamQueryCalled).toBe(true);
      expect(useUpdateTeamMutationCalled).toBe(true);
    });

    it('should delete a project and call useDeleteTeamProjectMutation', async () => {
      let deleteTeamProjectMutationCalled = false;
      let getUserTeamQueryCalled = false;

      const getUserTeamQuery = {
        request: {
          query: GetUserTeamDocument,
          variables: { id: HashFactory.decode('asd') }
        },
        result: () => {
          getUserTeamQueryCalled = true;
          return {
            data: {
              getUserTeam: {
                id: mockQuery.id,
                name: mockQuery.name,
                members: [
                  {
                    id: 1,
                    username: 'dev'
                  }
                ],
                projects: [
                  {
                    id: mockQuery.projectId,
                    name: mockQuery.projectName
                  }
                ]
              }
            }
          };
        }
      };

      const deleteTeamProjectMutation = {
        request: {
          query: DeleteTeamProjectDocument,
          variables: {
            teamId: mockQuery.id,
            projectId: mockQuery.projectId
          }
        },
        result: () => {
          deleteTeamProjectMutationCalled = true;
          return {
            data: {
              deleteTeamProject: {
                id: mockQuery.projectId,
                name: mockQuery.projectName
              }
            }
          };
        }
      };

      const wrapper = mount(
        <MockedProvider
          mocks={[
            getUserTeamQuery,
            deleteTeamProjectMutation,
            getUserTeamQuery
          ]}
          addTypename={false}
        >
          <MemoryRouter initialEntries={[routerLocation.pathname]}>
            <Route
              exact
              path={'/team/:teamId/:teamName'}
              render={() => <TeamPage />}
              // component={TeamPage}
            />
          </MemoryRouter>
        </MockedProvider>
      );
      await act(async () => {
        await wait(0);

        wrapper.update();
        wrapper.find(`Button#${mockQuery.projectId}`).simulate('click');

        await wait(0);
      });
      expect(getUserTeamQueryCalled).toBe(true);
      expect(deleteTeamProjectMutationCalled).toBe(true);
    });

    it('should delete a team member and call useDeleteTeamMemberMutation', async () => {
      let deleteTeamMemberMutationCalled = false;
      let getUserTeamQueryCalled = false;

      const getUserTeamQuery = {
        request: {
          query: GetUserTeamDocument,
          variables: { id: HashFactory.decode('asd') }
        },
        result: () => {
          getUserTeamQueryCalled = true;
          return {
            data: {
              getUserTeam: {
                id: mockQuery.id,
                name: mockQuery.name,
                members: [
                  {
                    id: mockQuery.memberId,
                    username: mockQuery.memberName
                  }
                ],
                projects: [
                  {
                    id: mockQuery.projectId,
                    name: mockQuery.projectName
                  }
                ]
              }
            }
          };
        }
      };

      const deleteTeamMemberMutation = {
        request: {
          query: DeleteTeamMemberDocument,
          variables: {
            userId: mockQuery.memberId,
            teamId: mockQuery.id
          }
        },
        result: () => {
          deleteTeamMemberMutationCalled = true;
          return {
            data: {
              deleteTeamMember: {}
            }
          };
        }
      };

      const wrapper = mount(
        <MockedProvider
          mocks={[getUserTeamQuery, deleteTeamMemberMutation, getUserTeamQuery]}
          addTypename={false}
        >
          <MemoryRouter initialEntries={[routerLocation.pathname]}>
            <Route
              exact
              path={'/team/:teamId/:teamName'}
              render={() => <TeamPage />}
              // component={TeamPage}
            />
          </MemoryRouter>
        </MockedProvider>
      );
      await act(async () => {
        await wait(0);

        wrapper.update();
        wrapper.find(`Button#${mockQuery.memberId}`).simulate('click');

        await wait(0);
      });
      expect(getUserTeamQueryCalled).toBe(true);
      expect(deleteTeamMemberMutationCalled).toBe(true);
    });

    it('should change route when clicking a project', async () => {
      jest
        .spyOn(HashFactory, 'encode')
        .mockImplementation((_id: string | number) => 'abc');

      let getUserTeamQueryCalled = false;

      let newRouterLocation = '/team/teamId/teamName';

      const getUserTeamQuery = {
        request: {
          query: GetUserTeamDocument,
          variables: { id: mockQuery.id }
        },
        result: () => {
          getUserTeamQueryCalled = true;
          return {
            data: {
              getUserTeam: {
                id: mockQuery.id,
                name: mockQuery.name,
                members: [
                  {
                    id: mockQuery.memberId,
                    username: mockQuery.memberName
                  }
                ],
                projects: [
                  {
                    id: mockQuery.projectId,
                    name: mockQuery.projectName
                  }
                ]
              }
            }
          };
        }
      };

      const wrapper = mount(
        <MockedProvider mocks={[getUserTeamQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[newRouterLocation]}>
            <Switch>
              <Route
                path="/team/:teamId/:teamName"
                render={() => <TeamPage />}
              />
              <Route
                path="/project/:projectId/:projectName"
                render={({ location }) => {
                  newRouterLocation = location.pathname;
                  return <div />;
                }}
              />
            </Switch>
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();

        wrapper.find(`div#${mockQuery.projectId}`).simulate('click');

        await wait(0);
      });
      expect(getUserTeamQueryCalled).toBe(true);
      // expect(wrapper.contains(<ProjectPage />));
      expect(newRouterLocation).toEqual(
        `/project/${HashFactory.encode(mockQuery.projectId)}/${
          mockQuery.projectName
        }`
      );
    });
  });
});
