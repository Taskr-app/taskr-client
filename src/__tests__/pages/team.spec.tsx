import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import TeamPage from '../../pages/team';
import { MemoryRouter, Route } from "react-router";
import Hashids from "hashids/cjs";
import * as HashFactory from "../../lib/hashids";
import { MockedProvider, wait } from "@apollo/react-testing";
import { GetUserTeamDocument, UpdateTeamDocument, DeleteTeamProjectDocument } from '../../generated/graphql';
import { decode } from 'punycode';
import { act } from "react-dom/test-utils";

describe("Pages", () => {
  describe("Team", () => {
    // const hashids = new Hashids("abc", 10);
    // jest
    //   .spyOn(HashFactory, "decode")
    //   .mockImplementation((id: string) => hashids.decode(id).toString());

      jest.spyOn(HashFactory, "decode").mockImplementation((_id: string) => "1");

      const routerLocation = {
        pathname: "/team/teamId/teamName",
        teamId: "teamId",
        teamName: "teamName"
      };
  
      const mockQuery = {
        id: HashFactory.decode(routerLocation.teamId),
        name: routerLocation.teamName,
        newName: "newTeamName",
        projectId: "projectName",
        projectName: "project-01"
      };

    it("should render and call getUserTeamQuery", async() => {
      let getUserTeamQueryCalled = false;
      const getUserTeamQuery = {
        request: {
          query: GetUserTeamDocument,
          variables: {id: mockQuery.id}
        },
        result: () => {
          getUserTeamQueryCalled = true;
            return {
              data: {
                getUserTeam: {
                  id: mockQuery.id,
                  name: mockQuery.name,
                  members: [{
                    id: 1,
                    username: "dev"
                  }],
                  projects: [{
                    id: mockQuery.projectId,
                    name: mockQuery.projectName
                  }]
                } 
              }
            }
          }
        }
      const wrapper = render(
        <MockedProvider mocks={[getUserTeamQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation.pathname]}>
            <Route 
              exact 
              path={"/team/:teamId/:teamName"} 
              render={() => <TeamPage />}
              // component={TeamPage}
            />
          </MemoryRouter>
        </MockedProvider>
      )
      await act(async() => {
        await wait(10)
      })
      expect(getUserTeamQueryCalled).toBe(true);
    });

    it("should mutate and call useUpdateTeamMutation", async() => {
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
            }
          }
        }

        const getUserTeamQuery = {
          request: {
            query: GetUserTeamDocument,
            variables: {id: mockQuery.id}
          },
          result: () => {
            getUserTeamQueryCalled = true;
              return {
                data: {
                  getUserTeam: {
                    id: mockQuery.id,
                    name: mockQuery.name,
                    members: [{
                      id: 1,
                      username: "dev"
                    }],
                    projects: [{
                      id: mockQuery.projectId,
                      name: mockQuery.projectName
                    }]
                  } 
                }
              }
            }
          }
      const wrapper = mount(
        <MockedProvider mocks={[getUserTeamQuery, updateTeamMutation, getUserTeamQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation.pathname]}>
            <Route 
              exact 
              path={"/team/:teamId/:teamName"} 
              render={() => <TeamPage />}
              // component={TeamPage}
            />
          </MemoryRouter>
        </MockedProvider>
      )
      await act(async() => {
        await wait(0);

        wrapper.update();
        wrapper.find('input#teamName').simulate('change', {
          target: {name: "teamName", value: mockQuery.newName}
        });
        wrapper.find('form').simulate('submit');
        
        await wait(0);
      })
      expect(getUserTeamQueryCalled).toBe(true);
      expect(useUpdateTeamMutationCalled).toBe(true);
    });

    it("should delete a project and call useDeleteTeamProjectMutation", async() => {
      let deleteTeamProjectMutationCalled = false;
      let getUserTeamQueryCalled = false;

      const getUserTeamQuery = {
        request: {
          query: GetUserTeamDocument,
          variables: {id: HashFactory.decode("asd")}
        },
        result: () => {
          getUserTeamQueryCalled = true;
            return {
              data: {
                getUserTeam: {
                  id: mockQuery.id,
                  name: mockQuery.name,
                  members: [{
                    id: 1,
                    username: "dev"
                  }],
                  projects: [{
                    id: mockQuery.projectId,
                    name: mockQuery.projectName
                  }]
                } 
              }
            }
          }
        }

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
            }
          }
        }

        const wrapper = mount(
          <MockedProvider mocks={[getUserTeamQuery, deleteTeamProjectMutation, getUserTeamQuery]} addTypename={false}>
            <MemoryRouter initialEntries={[routerLocation.pathname]}>
              <Route 
                exact 
                path={"/team/:teamId/:teamName"} 
                render={() => <TeamPage />}
                // component={TeamPage}
              />
            </MemoryRouter>
          </MockedProvider>
        )
        await act(async() => {
          await wait(0);
  
          wrapper.update();
          wrapper.find(`button#${mockQuery.projectId}`).simulate('click');
          
          await wait(0);
        })
        expect(getUserTeamQueryCalled).toBe(true);
        expect(deleteTeamProjectMutationCalled).toBe(true);

    }); 



  });
});