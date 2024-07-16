/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type INestApplication } from '@nestjs/common';

import { connect, type NatsConnection } from 'nats';
import { AppModule } from '../src/app.module';
import { createFakeLink } from './utils';
import { link, LinkDoesNotExist } from '@app/shared';
import { MessageBusModule } from '@app/message-bus';
import { ExtendedLoggerModule } from '@app/logger';
import { Test, type TestingModule } from '@nestjs/testing';

describe(AppModule.name, () => {
  let app: INestApplication;
  let natsClient: NatsConnection;
  let linkService: link.LinkService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        ExtendedLoggerModule.registry(),
        MessageBusModule.registry(),
        link.LinkModule,
      ],
    }).compile();

    linkService = moduleRef.get(link.LinkService);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    natsClient = await connect({ servers: [process.env.NATS_URL!] });
    app = await AppModule.bootstrap();
  });

  afterEach(async () => {
    await app.close();
    await moduleRef.close();
    await natsClient.close();
  });

  it(`Should create link and get the link and delete it`, async () => {
    const link = createFakeLink();

    const id = await linkService.create(link.data);

    const result = await linkService.get(id);

    expect(result).toStrictEqual(link.data);
  });
  it(`Should throw error if link not exist`, async () => {
    await expect(linkService.get(`TEST`)).rejects.toMatchObject({
      message: LinkDoesNotExist.MESSAGE,
      code: LinkDoesNotExist.CODE,
      name: LinkDoesNotExist.name,
    });
  });
});
