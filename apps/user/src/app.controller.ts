import { user } from '@app/shared';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './services';
import { MessageBusService } from '@app/message-bus';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly messageBus: MessageBusService,
  ) {}

  @MessagePattern(user.commands.auth)
  async auth(
    @Payload() payload: user.dto.AuthUserRequestDTO,
  ): Promise<user.dto.AuthUserResponseDTO> {
    return this.userService.auth({
      email: payload.email,
      password: payload.password,
    });
  }

  @MessagePattern(user.commands.register)
  async register(
    @Payload() payload: user.dto.RegisterUserRequestDTO,
  ): Promise<user.dto.RegisterUserResponseDTO> {
    const { email, password } = payload;

    const registerUser = await this.userService.register({
      email,
      password,
    });

    await this.messageBus.emit(user.events.userRegistered, registerUser);

    return registerUser;
  }

  @MessagePattern(user.commands.logOut)
  logOut(
    @Payload() payload: user.dto.LogOutRequestDTO,
  ): user.dto.LogOutResponseDTO {
    return true;
  }
}
