import { MessageBusService } from '@app/message-bus';
import { user } from '@app/shared';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { Redis } from 'ioredis';
import {
  UserAuthRequestDTO,
  UserAuthResponseDTO,
  UserRegisterRequestDTO,
} from '../../../dto';

@ApiTags(`user`)
@Controller(`v1/public/user`)
export class UserController {
  constructor(
    private readonly messageBus: MessageBusService,
    private readonly redis: Redis,
  ) {}

  @Post(`register`)
  public async register(
    @Body() payload: UserRegisterRequestDTO,
  ): Promise<void> {
    await this.redis.set(`test`, 123);
    await this.messageBus.send(user.commands.register, payload);
  }

  @Post(`auth`)
  @ApiResponse({ type: UserAuthResponseDTO })
  async auth(
    @Body() payload: UserAuthRequestDTO,
  ): Promise<UserAuthResponseDTO> {
    const result = await this.messageBus.send(user.commands.auth, payload);

    return plainToInstance(UserAuthResponseDTO, result);
  }
}
