import { MessageBusModule, MessageBusService } from '@app/message-bus';
import { Module } from '@nestjs/common';
import { LinkService } from './link.service';

@Module({
  imports: [MessageBusModule],
  providers: [LinkService, MessageBusService],
  exports: [LinkService],
})
export class LinkModule {}
