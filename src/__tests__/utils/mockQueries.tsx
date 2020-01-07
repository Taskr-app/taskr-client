import { MeDocument, LogoutDocument } from '../../generated/graphql';
import { mockUser } from './mockUser';

export const mockMeQuery = {
  request: {
    query: MeDocument
  },
  result: {
    data: {
      me: {
        id: mockUser.id,
        email: mockUser.email,
        username: mockUser.username,
        avatar: mockUser.avatar,
        auth: mockUser.auth
      }
    },
    loading: false
  }
};

export const mockLogoutMutation = {
  request: {
    query: LogoutDocument
  },
  result: {
    data: {
      logout: true
    }
  }
};
