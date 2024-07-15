import { type CommandType } from '@app/common';
import {
  type LogOutRequestDTO,
  type AuthUserRequestDTO,
  type AuthUserResponseDTO,
  type RegisterUserRequestDTO,
  type RegisterUserResponseDTO,
  type LogOutResponseDTO,
} from './dto';

export const commands = {
  register: `user:register`,
  auth: `user:auth`,
  logOut: `user:log-out`,
} satisfies Record<string, `user:${string}`>;

export interface CommandsType {
  [commands.register]: CommandType<
    RegisterUserRequestDTO,
    RegisterUserResponseDTO
  >;
  [commands.auth]: CommandType<AuthUserRequestDTO, AuthUserResponseDTO>;
  [commands.logOut]: CommandType<LogOutRequestDTO, LogOutResponseDTO>;
}
