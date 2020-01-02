import * as React from 'react';
import { mount } from 'enzyme';
import { MockedProvider, wait } from '@apollo/react-testing';
import {
  AcceptTeamInviteLinkDocument,
  MeDocument,
  ValidateLinkDocument
} from '../../../../generated/graphql';
import TeamInviteSuccessPage from '../../../../pages/invite/team/success';
import { act } from 'react-dom/test-utils';
import AnonLayout from '../../../../components/layouts/AnonLayout';
import { GraphQLError } from 'graphql';
import ErrorLayout from '../../../../components/layouts/ErrorLayout';
import { MemoryRouter, Switch, Route } from 'react-router';
import Dashboard from '../../../../pages/dashboard';

describe('Pages', () => {
  describe('TeamInviteSuccessPage', () => {
    const mockQuery = {
      id: 178,
      email: 'dev@email.com',
      username: 'dev',
      teamInviteLink: 'abc',
      key: 'team-invite-dev@email.com',
      avatar: null
    };

    let acceptTeamInviteLinkCalled = false;
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
          link: mockQuery.teamInviteLink
        }
      },
      result: {
        data: {
          validateLink: true
        },
        loading: false
      }
    };

    const acceptTeamLinkInviteQuery = {
      request: {
        query: AcceptTeamInviteLinkDocument,
        variables: {
          email: mockQuery.email,
          teamInviteLink: mockQuery.teamInviteLink
        }
      },
      result: () => {
        acceptTeamInviteLinkCalled = true;
        return {
          data: {
            acceptTeamInviteLink: mockQuery.teamInviteLink
          }
        };
      }
    };

    const routerLocation = {
      pathname: '/invite/team/success',
      search: `?email=${mockQuery.email}&id=${mockQuery.teamInviteLink}`
    };
    it('fires acceptTeamInvite mutation on mount', async () => {
      const wrapper = mount(
        <MockedProvider
          mocks={[meQuery, validateLinkQuery, acceptTeamLinkInviteQuery]}
          addTypename={false}
        >
          <MemoryRouter initialEntries={[routerLocation]}>
            <Switch>
              <Route
                exact
                path='/invite/team/success'
                render={() => <TeamInviteSuccessPage />}
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

      expect(acceptTeamInviteLinkCalled).toBe(true);
      expect(routerLocation.pathname).toEqual('/');
      wrapper.unmount();
    });

    it('should render an error layout if the link has expired', async () => {
      const errorQuery = {
        ...validateLinkQuery,
        result: {
          errors: [new GraphQLError('This link has expired')]
        }
      };
      const wrapper = mount(
        <MockedProvider mocks={[errorQuery]}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <TeamInviteSuccessPage />
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
        <MockedProvider mocks={[validateLinkQuery]}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <TeamInviteSuccessPage />
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
