import * as React from "react";
import { render } from "enzyme";
import Home from "../../pages/home";
import { MockedProvider } from "@apollo/react-testing";
import { MeDocument } from "../../generated/graphql";
import Layout from "../../components/layouts/Layout";
import { MemoryRouter } from "react-router";

describe("Pages", () => {
  describe("Home", () => {
    const mocks = [
      {
        request: {
          query: MeDocument
        },
        result: {
          data: {
            me: { id: 1, email: "example@email.com" }
          }
        }
      }
    ];

    it("should render and call me query", () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        </MockedProvider>
      );
    });

    it("should render an empty div in <Layout /> during load/error", () => {
      render(
        <MockedProvider mocks={[]}>
          <MemoryRouter>
            <Layout>
              <div />
            </Layout>
          </MemoryRouter>
        </MockedProvider>
      );
    });
  });
});
