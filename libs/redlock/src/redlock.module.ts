import {
  type DynamicModule,
  Module,
  type OnApplicationShutdown,
} from '@nestjs/common';
import Redis from 'ioredis';
import Redlock from 'redlock';
import { type RedisConfig, RedisModule } from '@app/redis';

@Module({})
export class RedlockModule implements OnApplicationShutdown {
  constructor(private readonly redis: Redis) {}

  onApplicationShutdown(): void {
    this.redis.disconnect(false);
  }

  static registry(config?: Partial<RedisConfig>): DynamicModule {
    return {
      module: Redlock,
      imports: [RedisModule.registry(config)],
      providers: [
        {
          provide: Redlock,
          inject: [Redis],
          useFactory(redis: Redis) {
            return new Redlock([redis]);
          },
        },
      ],
      exports: [Redlock],
    };
  }
}
