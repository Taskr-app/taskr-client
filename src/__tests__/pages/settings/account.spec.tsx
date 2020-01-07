import * as React from 'react';
import {
  UserAuthType,
  MeDocument,
  UpdateUsernameDocument,
  SendNewEmailLinkDocument,
  UploadAvatarDocument
} from '../../../generated/graphql';
import { MockedProvider, wait } from '@apollo/react-testing';
import AccountSettingsPage from '../../../pages/settings/account';
import { mount } from 'enzyme';
import styles from '../../../pages/settings/account/AccountSettings.module.scss';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route } from 'react-router';
import AccountSettingsForm from '../../../pages/settings/account/AccountSettingsForm';

/**
 * TODO
 * 1. Should test for editing render statements (2)
 * 2. Should test updateUserName Mutation
 * 3. Should test updateEmail Mutation
 * 4. Should test uploadAvatar Mutation
 */

describe('Pages', () => {
  describe('settings/account', () => {
    let updateUsernameMutationCalled = false;
    let sendNewEmailLinkMutationCalled = false;
    let uploadAvatarMutationCalled = false;

    window.URL.createObjectURL = jest.fn();
    window.URL.revokeObjectURL = jest.fn();

    const mockQuery = {
      id: 123,
      email: 'dev@email.com',
      username: 'dev',
      avatar: null,
      auth: UserAuthType.Website,
      newUsername: 'dev2',
      newEmail: 'dev2@email.com',
      image: {
        name: 'cat.jpg',
        path: 'cat.jpg',
        size: 200,
        type: 'image/jpeg'
      }
    };

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

    const updateUsernameMutation = {
      request: {
        query: UpdateUsernameDocument,
        variables: {
          username: mockQuery.newUsername
        }
      },
      result: () => {
        updateUsernameMutationCalled = true;
        return {
          data: {
            updateUsername: true
          }
        };
      }
    };

    const sendNewEmailLinkMutation = {
      request: {
        query: SendNewEmailLinkDocument,
        variables: {
          email: mockQuery.newEmail
        },
        result: () => {
          sendNewEmailLinkMutationCalled = true;
          return {
            data: {
              sendNewEmailLink: true
            }
          };
        }
      }
    };

    const uploadAvatarMutation = {
      request: {
        query: UploadAvatarDocument,
        variables: {
          image: mockQuery.image
        }
      },
      result: () => {
        uploadAvatarMutationCalled = true;
        return {
          data: {
            uploadAvatar: true
          }
        };
      }
    };

    it("should render user's information when editing prop is false and render AccountSettingsForm if true", async () => {
      const wrapper = mount(
        <MockedProvider mocks={[meQuery]} addTypename={false}>
          <AccountSettingsPage />
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
      });

      expect(
        wrapper
          .find('.username')
          .childAt(1)
          .text()
      ).toEqual(mockQuery.username);
      expect(
        wrapper
          .find('.email')
          .childAt(1)
          .text()
      ).toEqual(mockQuery.email);

      wrapper.find('button[type="button"]').simulate('click');
      wrapper.update();

      expect(wrapper.find('button[type="submit"]').text()).toEqual('Save');
    });

    it('should call updateUsername &or sendNewEmailLink mutation when input is changed and submitted', async () => {
      const wrapper = mount(
        <MockedProvider
          mocks={[
            meQuery,
            updateUsernameMutation,
            meQuery,
            sendNewEmailLinkMutation
          ]}
          addTypename={false}
        >
          <AccountSettingsForm handleEdit={() => null} />
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
        const usernameInput = wrapper.find('input#account-settings_username');
        usernameInput.simulate('change', {
          target: { name: 'username', value: mockQuery.newUsername }
        });
        const emailInput = wrapper.find('input#account-settings_email');
        emailInput.simulate('change', {
          target: { name: 'email', value: mockQuery.newEmail }
        });
        wrapper.find('form').simulate('submit');
        await wait(0);
      });

      expect(updateUsernameMutationCalled).toBe(true);
      expect(sendNewEmailLinkMutationCalled).toBe(true);
    });

    it('should call uploadAvatar mutation when a file image is dropped', async () => {
      const wrapper = mount(
        <MockedProvider
          mocks={[meQuery, uploadAvatarMutation, meQuery]}
          addTypename={false}
        >
          <AccountSettingsForm handleEdit={() => null} />
        </MockedProvider>
      );

      await act(async () => {
        await wait(0);
        wrapper.update();
        const dropzone = wrapper.find('input[type="file"]');
        dropzone.simulate('drop', {
          target: { files: [mockQuery.image] },
          preventDefault: () => {},
          persist: () => {}
        });
        await wait(0)
        wrapper.find('form').simulate('submit');
        await wait(0);
      });

      expect(uploadAvatarMutationCalled).toBe(true);
    });
  });
});
