import * as React from 'react';
import { mount } from 'enzyme';
import { MockedProvider, wait } from '@apollo/react-testing';
import {
  MeDocument,
  ValidateLinkDocument,
  AcceptProjectInviteLinkDocument
} from '../../../../generated/graphql';
import ProjectInviteSuccessPage from '../../../../pages/invite/project/success';
import { act } from 'react-dom/test-utils';
import { GraphQLError } from 'graphql';
import ErrorLayout from '../../../../components/layouts/ErrorLayout';
import AnonLayout from '../../../../components/layouts/AnonLayout';
import { MemoryRouter, Route, Switch } from 'react-router';
import Dashboard from '../../../../pages/dashboard';
import { queryStringify } from '../../../../lib/queryParser';

describe('Pages', () => {
  describe('ProjectInviteSuccessPage', () => {
    const mockQuery = {
      email: 'dev@email.com',
      username: 'dev',
      projectInviteLink: 'qwe',
      id: 123,
      key: 'project-invite-dev@email.com',
      avatar: null
    };

    const routerLocation = {
      pathname: '/invite/project/success',
      search: queryStringify({
        email: mockQuery.email,
        id: mockQuery.projectInviteLink
      })
    };

    let acceptProjectInviteLinkCalled = false;
    const meQuery = {
      request: {
        query: MeDocument
      },
      result: {
        data: {
          me: {
            id: mockQuery.id,
            email: mockQuery.email,
            username: mockQuery.username,
            avatar: mockQuery.avatar
          }
        },
        loading: false
      }
    };
    const validateLinkQuery = {
      request: {
        query: ValidateLinkDocument,
        variables: {
          key: mockQuery.key,
          link: mockQuery.projectInviteLink
        }
      },
      result: {
        data: {
          validateLink: true
        },
        loading: false
      }
    };
    const acceptProjectLinkQuery = {
      request: {
        query: AcceptProjectInviteLinkDocument,
        variables: {
          email: mockQuery.email,
          projectInviteLink: mockQuery.projectInviteLink
        }
      },
      result: () => {
        acceptProjectInviteLinkCalled = true;
        return {
          data: {
            acceptProjectInviteLink: mockQuery.projectInviteLink
          }
        };
      }
    };

    it('fires acceptProjectInviteLink mutation on mount', async () => {
      const wrapper = mount(
        <MockedProvider
          mocks={[meQuery, validateLinkQuery, acceptProjectLinkQuery]}
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
        await wait(10);
      });

      expect(acceptProjectInviteLinkCalled).toBe(true);
      expect(routerLocation.pathname).toEqual('/');
      wrapper.unmount();
    });

    it('should render an error layout if the link has expired', async () => {
      const errorQuery = {
        ...validateLinkQuery,
        result: {
          errors: [new GraphQLError(`This link has expired`)]
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
      });

      expect(wrapper.contains(<ErrorLayout />));
    });

    it('should render an auth form if user is not authenticated', async () => {
      const wrapper = mount(
        <MockedProvider mocks={[validateLinkQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <ProjectInviteSuccessPage />
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
      });

      expect(
        wrapper.contains(
          <AnonLayout handleSignup={() => null} handleLogin={() => null} />
        )
      );
    });
  });
});
