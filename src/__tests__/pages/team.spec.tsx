import React from 'react';
import { render } from 'enzyme';
import TeamPage from '../../pages/team';
import { MemoryRouter, Route } from "react-router";
import Hashids from "hashids/cjs";
import * as HashFactory from "../../lib/hashids";
import { MockedProvider, wait } from "@apollo/react-testing";
import { GetUserTeamDocument } from '../../generated/graphql';
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
          variables: {id: "asd"}
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
        <MockedProvider mocks={[mock]}>
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


  });
});