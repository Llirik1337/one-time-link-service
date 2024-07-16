import { Controller } from '@nestjs/common';
import { LinkService } from './services';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { link } from '@app/shared';

@Controller()
export class AppController {
  constructor(private readonly linkService: LinkService) {}

  @MessagePattern(link.commands.create)
  async create(
    @Payload() payload: link.dto.CreateLinkRequestDTO,
  ): Promise<link.dto.CreateLinkResponseDTO> {
    const result = await this.linkService.create(payload);

    return { id: result.id };
  }

  @MessagePattern(link.commands.get)
  async get(
    @Payload() payload: link.dto.GetLinkRequestDTO,
  ): Promise<link.dto.GetLinkResponseDTO> {
    const result = await this.linkService.get(payload.id);

    return {
      data: result.data,
    };
  }
}
