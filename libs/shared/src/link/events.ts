import { type EventName, type EventType } from '@app/common';
import { prefix } from '.';
import { type CreateLinkResponseDTO } from './dto';

export const events = {
  linkCreated: `${prefix}:linkCreated`,
} satisfies Record<string, EventName<typeof prefix>>;

export interface EventsType {
  [events.linkCreated]: EventType<CreateLinkResponseDTO>;
}
