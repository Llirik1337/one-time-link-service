import { Test, type TestingModule } from '@nestjs/testing';
import { type Db } from 'mongodb';
import { getMongoDatabaseToken } from 'nestjs-mongodb-native';
import { AppModule } from '../app.module';
import { createFakeLink } from '../../test/utils';
import { LinkRepository } from '../repositories';

describe(LinkRepository, () => {
  let repository: LinkRepository;
  let db: Db;

  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = moduleRef.get(LinkRepository);
    db = moduleRef.get(getMongoDatabaseToken());
  });

  afterEach(async () => {
    await db.dropDatabase();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it(`Should save and get`, async () => {
    const link = createFakeLink();

    const savedLink = await repository.save(link);

    const result = await repository.findOne({ _id: savedLink._id });

    expect(result?.data).toStrictEqual(link.data);
  });

  it(`Should find by data`, async () => {
    const link = createFakeLink();

    await repository.save(link);

    const result = await repository.findOne({ data: link.data });

    expect(result?.data).toStrictEqual(link.data);
  });

  it(`Should delete by _id`, async () => {
    const link = createFakeLink();

    const savedLink = await repository.save(link);

    await repository.deleteById(savedLink);

    const result = await repository.findOne({ _id: savedLink._id });

    expect(result).toStrictEqual(null);
  });
});
