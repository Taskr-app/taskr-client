import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MockedProvider, wait } from "@apollo/react-testing";
import { ResendVerificationLinkDocument } from "../../../generated/graphql";
import EmailVerificationPage from "../../../pages/email-verification";
import { queryStringify } from "../../../lib/queryParser";
import { MemoryRouter, Route } from "react-router";

describe("Pages", () => {
  describe("EmailVerificationPage", () => {
    let resendVerificationLinkCalled = false;
    const mockQuery = {
      email: "qwjwlqqwrq@email.com",
      verificationLink: "abc"
    };
    const mocks = [
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

    const routerLocation = {
      pathname: "/email-verification",
      search: queryStringify({
        email: mockQuery.email,
        id: mockQuery.verificationLink
      })
    };

    it("fires resendVerificationLink mutation on clicking resend link", async () => {
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <Route
              exact
              path={routerLocation.pathname}
              render={() => <EmailVerificationPage />}
            />
          </MemoryRouter>
        </MockedProvider>
      );
      await act(async () => {
        wrapper.find(`button[type="button"]`).simulate("click");
        await wait(0);
      });

      expect(resendVerificationLinkCalled).toBe(true);
    });
  });
});
