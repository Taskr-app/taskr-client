import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MockedProvider, wait } from "@apollo/react-testing";
import { SendForgotPasswordLinkDocument } from "../../../generated/graphql";
import ForgotPasswordPage from "../../../pages/forgot-password";
import { MemoryRouter } from "react-router";

describe("Pages", () => {
  describe("ForgotPasswordPage", () => {
    let sendForgotPasswordLinkCalled = false;
    const mockQuery = {
      email: "qjwrwqr@email.com"
    };
    const mocks = [
      {
        request: {
          query: SendForgotPasswordLinkDocument,
          variables: {
            email: mockQuery.email
          }
        },
        result: () => {
          sendForgotPasswordLinkCalled = true;
          return {
            data: {
              sendForgotPasswordLink: "asdasda"
            }
          };
        }
      }
    ];

    const routerLocation = {
      pathname: "/forgot-password"
    };

    it("fires sendForgotPasswordLink mutation on submit button", async () => {
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <ForgotPasswordPage />
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        wrapper.find(`input[type="text"]`).simulate("change", {
          target: { name: "email", value: mockQuery.email }
        });
        wrapper.find("form").simulate("submit");
        await wait(1);
      });

      expect(sendForgotPasswordLinkCalled).toBe(true);
    });
  });
});
