import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MockedProvider, wait } from "@apollo/react-testing";
import {
  ResendVerificationLinkDocument,
  RegisterDocument
} from "../../../generated/graphql";
import EmailVerificationSuccessPage from "../../../pages/email-verification/success";
import { GraphQLError } from "graphql";
import ErrorLayout from "../../../components/layouts/ErrorLayout";
import { queryStringify } from "../../../lib/queryParser";
import { MemoryRouter, Route } from "react-router";

describe("Pages", () => {
  describe("EmailVerificationSuccessPage", () => {
    const mockQuery = {
      email: "qwjwlqqwrq@email.com",
      verificationLink: "abc"
    };

    const routerLocation = {
      pathname: "/email-verification/success",
      search: queryStringify({
        email: mockQuery.email,
        id: mockQuery.verificationLink
      })
    };

    it("fires register mutation on mount", async () => {
      let registerMutationCalled = false;
      const registerMock = [
        {
          request: {
            query: RegisterDocument,
            variables: {
              email: mockQuery.email,
              verificationLink: mockQuery.verificationLink
            }
          },
          result: () => {
            registerMutationCalled = true;
            return {
              data: {
                register: {
                  accessToken: "accesstokensecret"
                }
              }
            };
          }
        }
      ];

      const wrapper = mount(
        <MockedProvider mocks={registerMock} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <Route
              exact
              path={routerLocation.pathname}
              render={() => <EmailVerificationSuccessPage />}
            />
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
      });

      expect(registerMutationCalled).toBe(true);
      wrapper.unmount();
    });

    it("renders error message and fires resendVerificationLink mutation on clicking resend button", async () => {
      let resendVerificationLinkCalled = false;
      const resendVerificationLinkMock = [
        {
          request: {
            query: RegisterDocument,
            variables: {
              email: mockQuery.email,
              verificationLink: mockQuery.verificationLink
            }
          },
          result: {
            errors: [new GraphQLError("register error")]
          }
        },
        {
          request: {
            query: ResendVerificationLinkDocument,
            variables: {
              email: mockQuery.email
            }
          },
          result: () => {
            resendVerificationLinkCalled = true;
            return {
              data: {
                resendVerificationLink: mockQuery.verificationLink
              }
            };
          }
        }
      ];

      const wrapper = mount(
        <MockedProvider mocks={resendVerificationLinkMock} addTypename={false}>
            <MemoryRouter initialEntries={[routerLocation]}>
              <Route
                exact
                path={routerLocation.pathname}
                render={() => <EmailVerificationSuccessPage />}
              />
            </MemoryRouter>
        </MockedProvider>
      );
      await act(async () => {
        await wait(0);
        expect(wrapper.find(ErrorLayout)).toBeDefined();
      });
    });
  });
});
