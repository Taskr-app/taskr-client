import * as React from 'react';
import { queryStringify } from '../../../lib/queryParser';
import {
  ValidateLinkDocument,
  UpdateEmailDocument,
  UserAuthType
} from '../../../generated/graphql';
import { mockUser } from '../../utils/mockUser';
import { GraphQLError } from 'graphql';
import { mount } from 'enzyme';
import { MockedProvider, wait } from '@apollo/react-testing';
import { MemoryRouter, Switch, Route } from 'react-router';
import NewEmailSuccessPage from '../../../pages/new-email/success';
import { act } from 'react-dom/test-utils';
import ErrorLayout from '../../../components/layouts/ErrorLayout';
import { mockMeQuery, mockLogoutMutation } from '../../utils/mockQueries';
import { Input } from 'antd';

describe('Pages', () => {
  describe('NewEmailSuccessPage', () => {
    let updateEmailMutationCalled = false;

    const mockQuery = {
      ...mockUser,
      verificationLink: 'qwe',
      key: 'new-email-dev@email.com'
    };

    const routerLocation = {
      pathname: '/new-email/success',
      search: queryStringify({
        email: mockQuery.email,
        id: mockQuery.verificationLink
      })
    };

    const validateLinkQuery = {
      request: {
        query: ValidateLinkDocument,
        variables: {
          key: mockQuery.key,
          link: mockQuery.verificationLink
        }
      },
      result: {
        data: {
          validateLink: true
        },
        loading: false
      }
    };

    const updateEmailMutation = {
      request: {
        query: UpdateEmailDocument,
        variables: {
          email: mockQuery.email,
          verificationLink: mockQuery.verificationLink
        }
      },
      result: () => {
        updateEmailMutationCalled = true;
        return {
          data: {
            updateEmail: true
          }
        };
      }
    };

    it('should render ErrorLayout if the verificationLink has expired', async () => {
      const errorQuery = {
        ...validateLinkQuery,
        result: {
          errors: [new GraphQLError('This link has expired')]
        }
      };

      const wrapper = mount(
        <MockedProvider mocks={[errorQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <NewEmailSuccessPage />
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
      });

      expect(wrapper.containsMatchingElement(<ErrorLayout />)).toBe(true);
    });

    it('should render ErrorLayout if user is not authenticated', async () => {
      const wrapper = mount(
        <MockedProvider mocks={[validateLinkQuery]} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <NewEmailSuccessPage />
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
      });

      expect(wrapper.containsAllMatchingElements([<ErrorLayout />])).toBe(true);
    });

    it('should prompt user to create a new password if they are a google user', async () => {
      const mockGoogleUserQuery = {
        ...mockMeQuery,
        result: {
          data: {
            me: {
              ...mockMeQuery.result.data.me,
              auth: UserAuthType.Google
            }
          }
        }
      };
      const wrapper = mount(
        <MockedProvider
          mocks={[mockGoogleUserQuery, validateLinkQuery, updateEmailMutation]}
          addTypename={false}
        >
          <MemoryRouter initialEntries={[routerLocation]}>
            <NewEmailSuccessPage />
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
      });

      expect(wrapper.containsMatchingElement(<Input />));
    });

    it('should log the user out and redirect to login screen once their email is successfully updated', async () => {
      const wrapper = mount(
        <MockedProvider
          mocks={[
            mockMeQuery,
            validateLinkQuery,
            updateEmailMutation,
            mockLogoutMutation
          ]}
          addTypename={false}
        >
          <MemoryRouter initialEntries={[routerLocation]}>
            <Switch>
              <Route
                exact
                path='/new-email/success'
                render={() => <NewEmailSuccessPage />}
              />
              <Route exact path='/login' render={({ location }) => {
                routerLocation.pathname = location.pathname
                return <div />
              }} />
            </Switch>
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
        await wait(0);
      });

      expect(updateEmailMutationCalled).toBe(true);
      expect(routerLocation.pathname).toEqual('/login')
    });
  });
});
