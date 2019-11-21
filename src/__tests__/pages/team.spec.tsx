import React, { Component } from 'react';
import { render, mount } from 'enzyme';
import TeamPage from '../../pages/team';
import { MemoryRouter, Route } from "react-router";
import Hashids from "hashids/cjs";
import * as HashFactory from "../../lib/hashids";
import { MockedProvider, wait } from "@apollo/react-testing";
import { GetUserTeamDocument, UpdateTeamDocument } from '../../generated/graphql';
import { decode } from 'punycode';
import { act } from 'react-test-renderer';

describe("Pages", () => {
  describe("Team", () => {
    const hashids = new Hashids("abc", 10);
      jest
        .spyOn(HashFactory, "decode")
        .mockImplementation((id: string) => hashids.decode(id).toString());
    
    it("should render and call getUserTeamQuery", async() => {
      let getUserTeamQueryCalled = false;
      const mock = {
        request: {
          query: GetUserTeamDocument,
          variables: {id: HashFactory.decode("asd")}
        },
        result: () => {
          getUserTeamQueryCalled = true;
            return {
              data: {
                getUserTeam: {
                  id: "123",
                  name: "hello",
                  members: {
                    id: "1",
                    username: "h"
                  },
                  projects: {
                    id: "2",
                    name: "p"
                  }
                } 
              }
            }
          }
        }
      const wrapper = render(
        <MockedProvider mocks={[mock]} addTypename={false}>
          <MemoryRouter initialEntries={["/team/asd/abc"]}>
            <Route exact path={"/team/:teamId/:teamName"} component={TeamPage}/>
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
      const mock = {
        request: {
          query: UpdateTeamDocument,
          variables: {
            teamId: HashFactory.decode("asd"),
            name: "qwe"
          }
        },
        result: () => {
          useUpdateTeamMutationCalled = true;
            return {
              data: {
                updateTeam: {
                  id: "123",
                  name: "hello"
                } 
              }
            }
          }
        }

        const mock2 = {
          request: {
            query: GetUserTeamDocument,
            variables: {id: HashFactory.decode("asd")}
          },
          result: () => {
            getUserTeamQueryCalled = true;
              return {
                data: {
                  getUserTeam: {
                    id: "123",
                    name: "hello",
                    members: {
                      id: "1",
                      username: "h"
                    },
                    projects: {
                      id: "2",
                      name: "p"
                    }
                  } 
                }
              }
            }
          }
      const wrapper = mount(
        <MockedProvider mocks={[mock, mock2]} addTypename={false}>
          <MemoryRouter initialEntries={["/team/asd/abc"]}>
            <Route exact path={"/team/:teamId/:teamName"} component={TeamPage}/>
          </MemoryRouter>
        </MockedProvider>
      )
      await act(async() => {
        await wait(10);
        wrapper.find('input#teamName').simulate('change', {
          target: {name: "teamName", value: mock.request.variables.name}
        });
      })
      expect(useUpdateTeamMutationCalled).toBe(true);
    });

  });
});