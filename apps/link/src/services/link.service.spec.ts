import { Test, type TestingModule } from '@nestjs/testing';
import { type Db } from 'mongodb';
import { connect, type NatsConnection } from 'nats';
import { getMongoDatabaseToken } from 'nestjs-mongodb-native';
import { AppModule } from '../app.module';
import { LinkService } from './link.service';
import { MessageBusConfig } from '@app/message-bus';
import { createFakeLink } from '../../test/utils';
import { LinkDoesNotExist } from '@app/shared';

describe(LinkService, () => {
  let service: LinkService;
  let db: Db;
  let nats: NatsConnection;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = moduleRef.get(LinkService);
    db = moduleRef.get(getMongoDatabaseToken());

    const natsConfig: MessageBusConfig = moduleRef.get(MessageBusConfig);

    nats = await connect({
      servers: natsConfig.url,
    });
  });

  afterEach(async () => {
    await db.dropDatabase();
  });

  afterAll(async () => {
    await moduleRef.close();
    await nats.flush();
    await nats.drain();
  });

  it(`Should create one time link and after request return data and delete link`, async () => {
    const link = createFakeLink();

    const createdLink = await service.create(link);
    const result = await service.get(createdLink.id);

    await expect(service.get(createdLink.id)).rejects.toStrictEqual(
      new LinkDoesNotExist(),
    );
    expect(result).toStrictEqual(createdLink);
  });
});
