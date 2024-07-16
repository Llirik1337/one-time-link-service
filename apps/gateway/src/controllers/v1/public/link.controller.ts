import { link } from '@app/shared';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Config } from '../../../config';
import { CreateLinkRequestDTO, GetLinkResponseDTO } from '../../../dto';

@Controller({
  version: `1`,
  path: `public/link`,
})
export class LinkController {
  constructor(
    private readonly linkService: link.LinkService,
    private readonly config: Config,
  ) {}

  @Post(`create`)
  @ApiResponse({
    type: String,
    example: `http://localhost:3000/v1/public/links/ff010191-142e-4ea7-acfd-cbc6232b6de8`,
  })
  async create(@Body() payload: CreateLinkRequestDTO): Promise<string> {
    const id = await this.linkService.create(payload.data);

    const link = new URL(
      `/v1/public/link/${id}`,
      this.config.backendUrl,
    ).toString();

    return link;
  }

  @Get(`:id`)
  @ApiResponse({
    type: GetLinkResponseDTO,
  })
  async get(@Param(`id`) id: string): Promise<GetLinkResponseDTO> {
    const data = await this.linkService.get(id);

    return {
      data,
    };
  }
}
