import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MockedProvider, wait } from "@apollo/react-testing";
import { ForgotPasswordDocument } from "../../../generated/graphql";
import ForgotPasswordSuccessPage from "../../../pages/forgot-password/success";
import { queryStringify } from "../../../lib/queryParser";
import { MemoryRouter, Switch, Route } from "react-router";
import Login from "../../../pages/login"

describe("Pages", () => {
  describe("ForgotPasswordSuccessPage", () => {
    let forgotPasswordCalled = false;
    const mockQuery = {
      email: "qjwrwqr@email.com",
      id: "qwewqrwqrq",
      password: "password"
    };
    const mocks = [
      {
        request: {
          query: ForgotPasswordDocument,
          variables: {
            email: mockQuery.email,
            forgotPasswordLink: mockQuery.id,
            password: mockQuery.password
          }
        },
        result: () => {
          forgotPasswordCalled = true;
          return {
            data: {
              forgotPassword: true
            }
          };
        }
      }
    ];

    const routerLocation = {
      pathname: "/forgot-password/success",
      search: queryStringify({
        email: mockQuery.email,
        id: mockQuery.id
      })
    };

    it("fires forgotPassword mutation on submit and redirects to LoginPage", async () => {
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <Switch>
              <Route
                exact
                path={routerLocation.pathname}
                render={() => <ForgotPasswordSuccessPage />}
              />
              <Route
                exact
                path={'/login'}
                render={({ location }) => {
                  routerLocation.pathname = location.pathname;
                  return <Login />
                }}
              />
            </Switch>
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        wrapper
          .find(`input#forgotPasswordSuccess_password`)
          .simulate("change", {
            target: { name: "password", value: mockQuery.password }
          });
        wrapper
          .find(`input#forgotPasswordSuccess_confirmPassword`)
          .simulate("change", {
            target: { name: "confirmPassword", value: mockQuery.password }
          });
        wrapper.find("form").simulate("submit");
        await wait(0);
      });

      expect(forgotPasswordCalled).toBe(true);
      expect(wrapper.contains(<Login />))
      expect(routerLocation.pathname).toEqual('/login')
    });
  });
});
