import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { MockedProvider, wait } from '@apollo/react-testing';
import Login from '../../pages/login';
import { LoginDocument } from '../../generated/graphql';
import { MemoryRouter, Route } from 'react-router-dom';
import Dashboard from '../../pages/dashboard';

describe('Pages', () => {
  describe('Login', () => {
    let loginMutationCalled = false;
    let routerLocation = '/login';
    const mockUser = {
      email: 'qwjwlqqwrq@email.com',
      password: 'asdaskdjasldjal'
    };
    const mocks = [
      {
        request: {
          query: LoginDocument,
          variables: {
            email: mockUser.email,
            password: mockUser.password
          }
        },
        result: () => {
          loginMutationCalled = true;
          return {
            data: {
              login: { accessToken: '' }
            }
          };
        }
      }
    ];

    it('fires login mutation on submit and then redirects to dashboard', async () => {
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <Route path='/login' render={() => <Login />} />
            <Route
              path='/'
              render={({ location }) => {
                routerLocation = location.pathname;
                return <Dashboard />;
              }}
            />
          </MemoryRouter>
        </MockedProvider>
      );
      await act(async () => {
        wrapper.find('input[type="text"]').simulate('change', {
          target: { name: 'email', value: mockUser.email }
        });
        wrapper.find('input[type="password"]').simulate('change', {
          target: { name: 'password', value: mockUser.password }
        });
        wrapper.find('form').simulate('submit');
        await wait(0);
      });

      expect(loginMutationCalled).toBe(true);
      expect(wrapper.contains(<Dashboard />));
      expect(location.pathname).toEqual('/');
    });
  });
});
