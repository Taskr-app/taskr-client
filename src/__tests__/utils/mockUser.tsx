import { UserAuthType } from '../../generated/graphql';

export const mockUser = {
  email: 'dev@email.com',
  username: 'dev',
  id: 123,
  avatar: null,
  auth: UserAuthType.Website
};