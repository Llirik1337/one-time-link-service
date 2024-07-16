import { MessageBusService } from '@app/message-bus';
import { Injectable } from '@nestjs/common';
import { commands } from './commands';
import { type CreateLinkResponseDTO, type CreateLinkRequestDTO } from './dto';

@Injectable()
export class LinkService {
  constructor(private readonly messageBus: MessageBusService) {}

  async create(
    data: CreateLinkRequestDTO['data'],
  ): Promise<CreateLinkResponseDTO['id']> {
    const result = await this.messageBus.send(commands.create, { data });

    return result.id;
  }

  async get(
    id: CreateLinkResponseDTO['id'],
  ): Promise<CreateLinkRequestDTO['data']> {
    const result = await this.messageBus.send(commands.get, { id });

    return result.data;
  }
}
