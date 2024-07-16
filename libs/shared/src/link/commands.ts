import { type CommandName, type CommandType } from '@app/common';
import {
  type CreateLinkRequestDTO,
  type CreateLinkResponseDTO,
  type GetLinkRequestDTO,
  type GetLinkResponseDTO,
} from './dto';
import { type prefix } from '.';

export const commands = {
  create: `link:create`,
  get: `link:get`,
} satisfies Record<string, CommandName<typeof prefix>>;

export interface CommandsType {
  [commands.create]: CommandType<CreateLinkRequestDTO, CreateLinkResponseDTO>;
  [commands.get]: CommandType<GetLinkRequestDTO, GetLinkResponseDTO>;
}
