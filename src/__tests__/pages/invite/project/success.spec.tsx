import * as React from 'react';
import { mount } from 'enzyme';
import { MockedProvider, wait } from '@apollo/react-testing';
import { AcceptProjectInviteLinkDocument } from '../../../../generated/graphql';
import ProjectInviteSuccessPage from '../../../../pages/invite/project/success';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Switch } from 'react-router';
import Dashboard from '../../../../pages/dashboard';
import { queryStringify } from '../../../../lib/queryParser';
import { mockUser } from '../../../utils/mockUser';
import { mockMeQuery } from '../../../utils/mockQueries';
import { GraphQLError } from 'graphql';
import ErrorLayout from '../../../../components/layouts/ErrorLayout';
import AnonLayout from '../../../../components/layouts/AnonLayout';
import { AuthenticationError } from '../../../utils/mockErrors';

describe('Pages', () => {
  describe('ProjectInviteSuccessPage', () => {
    const mockQuery = {
      ...mockUser,
      projectInviteLink: 'qwe',
      projectId: 1,
      key: 'project-invite-dev@email.com'
    };

    const routerLocation = {
      pathname: '/invite/project/success',
      search: queryStringify({
        email: mockQuery.email,
        link: mockQuery.projectInviteLink,
        id: mockQuery.projectId.toString()
      })
    };

    let acceptProjectInviteLinkCalled = false;

    const acceptProjectLinkMutation = {
      request: {
        query: AcceptProjectInviteLinkDocument,
        variables: {
          email: mockQuery.email,
          id: mockQuery.projectId.toString(),
          projectInviteLink: mockQuery.projectInviteLink
        }
      },
      result: () => {
        acceptProjectInviteLinkCalled = true;
        return {
          data: {
            acceptProjectInviteLink: true
          }
        };
      },
      loading: false
    };

    it('fires acceptProjectInviteLink mutation on mount', async () => {
      const wrapper = mount(
        <MockedProvider
          mocks={[mockMeQuery, acceptProjectLinkMutation]}
          addTypename={false}
        >
          <MemoryRouter initialEntries={[routerLocation]}>
            <Switch>
              <Route
                exact
                path='/invite/project/success'
                render={() => <ProjectInviteSuccessPage />}
              />
              <Route
                exact
                path='/'
                render={({ location }) => {
                  routerLocation.pathname = location.pathname;
                  return <Dashboard />;
                }}
              />
            </Switch>
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
      });

      expect(acceptProjectInviteLinkCalled).toBe(true);
      expect(routerLocation.pathname).toEqual('/');
    });

    it('renders <ErrorLayout /> when the mutation results in an error', async () => {
      const errorQuery = {
        ...acceptProjectLinkMutation,
        result: {
          errors: [new GraphQLError('This link has expired')]
        }
      };

      const wrapper = mount(
        <MockedProvider mocks={[errorQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <ProjectInviteSuccessPage />
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
      });
      expect(wrapper.containsMatchingElement(<ErrorLayout />)).toBe(true);
    });

    it('renders <AnonLayout /> when the mutation results in an authentication error', async () => {
      const authenticationErrorQuery = {
        ...acceptProjectLinkMutation,
        result: {
          errors: [AuthenticationError]
        }
      };

      const wrapper = mount(
        <MockedProvider mocks={[authenticationErrorQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <ProjectInviteSuccessPage />
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
      });

      const handleLogin = (wrapper.instance() as any).handleLogin;
      const handleSignup = (wrapper.instance() as any).handleSignup;

      expect(
        wrapper.containsMatchingElement(
          <AnonLayout handleLogin={handleLogin} handleSignup={handleSignup} />
        )
      ).toBe(true);
    });

    it('redirects to / and prompts the user if they want to switch accounts if the email query is the same as the user', async () => {

      const wrapper = mount(
        <MockedProvider mocks={[mockMeQuery, acceptProjectLinkMutation]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <Switch>
              <Route
                exact
                path='/invite/project/success'
                render={() => <ProjectInviteSuccessPage />}
              />
              <Route
                exact
                path='/'
                render={({ location }) => {
                  routerLocation.pathname = location.pathname;
                  return <Dashboard />;
                }}
              />
            </Switch>
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
      });

      expect(routerLocation.pathname).toEqual('/');
    });
  });
});
