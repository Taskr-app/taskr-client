import * as React from 'react';
import { mount } from 'enzyme';
import { MockedProvider, wait } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router';
import GooglePage from '../../../pages/google';
import { Auth_GoogleOAuthDocument } from '../../../generated/graphql';
import { queryStringify } from '../../../lib/queryParser';
import { act } from 'react-dom/test-utils';

describe('Pages', () => {
  describe('GooglePage', () => {
    let googleOAuthMutationCalled = false;
    const mockQuery = {
      code: 'googleSecretCode',
      accessToken: 'abc123'
    };

    const routerLocation = {
      pathname: '/google',
      search: queryStringify({
        code: mockQuery.code
      })
    };

    const mocks = [
      {
        request: {
          query: Auth_GoogleOAuthDocument,
          variables: {
            code: mockQuery.code
          }
        },
        result: () => {
          googleOAuthMutationCalled = true;
          return {
            data: {
              auth_googleOAuth: {
                accessToken: mockQuery.accessToken
              }
            }
          };
        }
      }
    ];

    it('should fire google authentication mutation on mount', async () => {
      const windowLocation = JSON.stringify(window.location);
      delete window.location;
      Object.defineProperty(window, 'location', {
        value: JSON.parse(windowLocation)
      });

      mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={[routerLocation]}>
            <Route exact path='/google' component={GooglePage} />
          </MemoryRouter>
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
      });

      expect(googleOAuthMutationCalled).toBe(true);
    });
  });
});
