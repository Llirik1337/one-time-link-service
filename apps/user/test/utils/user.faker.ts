import { faker } from '@faker-js/faker';
import { type User } from '../../src/entities';

export const createFakeUser = (data?: Partial<User>): User => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...data,
});

export const createFakeUsers = (count: number): User[] =>
  Array.from(
    {
      length: count,
    },
    () => createFakeUser(),
  );
