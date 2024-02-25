import { users } from './users.model';

export const usersProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: users,
  },
];
