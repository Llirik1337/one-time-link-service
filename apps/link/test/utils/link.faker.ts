import { faker } from '@faker-js/faker';
import { type LinkEntity } from '../../src/entities';

export const createFakeLink = (data?: Partial<LinkEntity>): LinkEntity => ({
  data: faker.lorem.text(),
  ...data,
});
