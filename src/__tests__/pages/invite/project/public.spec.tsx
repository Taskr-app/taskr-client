import * as React from 'react';
import { mount } from 'enzyme';
import { MockedProvider, wait } from '@apollo/react-testing';
import {
  MeDocument,
  ValidatePublicProjectLinkDocument,
  AcceptPublicProjectLinkDocument,
  UserAuthType
} from '../../../../generated/graphql';
import PublicProjectInvitePage from '../../../../pages/invite/project/public';
import { act } from 'react-dom/test-utils';
import { GraphQLError } from 'graphql';
import ErrorLayout from '../../../../components/layouts/ErrorLayout';
import AnonLayout from '../../../../components/layouts/AnonLayout';
import { queryStringify } from '../../../../lib/queryParser';
import { MemoryRouter, Route } from 'react-router';
import Dashboard from '../../../../pages/dashboard';

describe('Pages', () => {
  describe('PublicProjectInvitePage', () => {
    const mockQuery = {
      email: 'dev@email.com',
      id: 123,
      projectId: '1241',
      projectInviteLink: 'abc',
      username: 'dev',
      avatar: null,
      auth: UserAuthType.Website
    };

    const routerLocation = {
      pathname: '/invite/project/public',
      search: queryStringify({
        id: mockQuery.projectInviteLink,
        project: mockQuery.projectId
      })
    };

    let acceptProjectLinkCalled = false;
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
            avatar: mockQuery.avatar,
            auth: mockQuery.auth
          }
        },
        loading: false
      }
    };

    const validateQuery = {
      request: {
        query: ValidatePublicProjectLinkDocument,
        variables: {
          projectId: mockQuery.projectId,
          link: mockQuery.projectInviteLink
        }
      },
      result: {
        data: {
          validatePublicProjectLink: true
        }
      }
    };

    const acceptProjectLinkQuery = {
      request: {
        query: AcceptPublicProjectLinkDocument,
        variables: {
          link: mockQuery.projectInviteLink,
          projectId: mockQuery.projectId
        }
      },
      result: () => {
        acceptProjectLinkCalled = true;
        return {
          data: {
            acceptPublicProjectLink: true
          }
        };
      }
    };

    it('fires acceptPublicProjectLink mutation on mount', async () => {
      const wrapper = mount(
        <MockedProvider
          mocks={[meQuery, validateQuery, acceptProjectLinkQuery]}
          addTypename={false}
        >
          <MemoryRouter initialEntries={[routerLocation]}>
            <Route
              exact
              path={[routerLocation.pathname]}
              render={() => <PublicProjectInvitePage />}
            />
            <Route
              exact
              path='/'
              render={({ location }) => {
                routerLocation.pathname = location.pathname;
                return <Dashboard />;
              }}
            />
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(10);
      });

      expect(acceptProjectLinkCalled).toBe(true);
      expect(routerLocation.pathname).toEqual('/');
      wrapper.unmount();
    });

    it('should render an error layout if the link has expired', async () => {
      const errorQuery = {
        ...validateQuery,
        result: {
          errors: [new GraphQLError('This link has expired')]
        }
      };

      const wrapper = mount(
        <MockedProvider mocks={[errorQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <PublicProjectInvitePage />
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
        <MockedProvider mocks={[validateQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <PublicProjectInvitePage />
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
