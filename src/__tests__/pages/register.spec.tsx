import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MockedProvider, wait } from '@apollo/react-testing';
import Register from '../../pages/register';
import {
  SendVerificationLinkDocument,
  RegisterDocument,
  MeDocument
} from '../../generated/graphql';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../../pages/dashboard';
import EmailVerificationPage from '../../pages/email-verification';

describe('Pages', () => {
  describe('Login', () => {
    const mockUser = {
      email: 'qwjwlqqwrq@email.com',
      password: 'asdaskdjasldjal'
    };

    it('fires sendVerificationLink mutation on clicking submit and redirect to /email-verification route', async () => {
      let sendVerificationLinkCalled = false;
      let routerLocation = '/register';
      const mocks = [
        {
          request: {
            query: SendVerificationLinkDocument,
            variables: {
              email: mockUser.email,
              password: mockUser.password
            }
          },
          result: () => {
            sendVerificationLinkCalled = true;
            return {
              data: {
                sendVerificationLink: 'abc'
              }
            };
          }
        }
      ];
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <Switch>
              <Route path='/register' render={() => <Register />} />
              <Route
                path='/email-verification'
                render={({ location }) => {
                  routerLocation = location.pathname;
                  return <EmailVerificationPage />;
                }}
              />
            </Switch>
          </MemoryRouter>
        </MockedProvider>
      );
      await act(async () => {
        wrapper.find('input[type="text"]').simulate('change', {
          target: { name: 'email', value: mockUser.email }
        });
        wrapper.find('input#register_password').simulate('change', {
          target: { name: 'password', value: mockUser.password }
        });
        wrapper.find('input#register_confirmPassword').simulate('change', {
          target: { name: 'confirmPassword', value: mockUser.password }
        });
        wrapper.find('form').simulate('submit');
        await wait(0);
      });
      expect(sendVerificationLinkCalled).toBe(true);
      expect(routerLocation).toEqual('/email-verification');
    });

    it('fires register mutation on click submit when a returnUrl', async () => {
      let registerMutationCalled = false;
      const routerLocation = {
        pathname: '/register',
        search: '?returnUrl=abc&id=123&registerKey=abc'
      };
      const mocks = [
        {
          request: {
            query: RegisterDocument,
            variables: {
              email: mockUser.email,
              password: mockUser.password,
              verificationLink: '123',
              registerKey: 'abc'
            }
          },
          result: () => {
            registerMutationCalled = true;
            return {
              data: {
                register: {
                  accessToken: 'abc'
                }
              }
            };
          }
        }
      ];
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <Switch>
              <Route path={'/register'} render={() => <Register />} />
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
        wrapper.find('input[type="text"]').simulate('change', {
          target: { name: 'email', value: mockUser.email }
        });
        wrapper.find('input#register_password').simulate('change', {
          target: { name: 'password', value: mockUser.password }
        });
        wrapper.find('input#register_confirmPassword').simulate('change', {
          target: { name: 'confirmPassword', value: mockUser.password }
        });
        wrapper.find('form').simulate('submit');
        await wait(0);
      });

      expect(registerMutationCalled).toBe(true);
    });
  });
});
