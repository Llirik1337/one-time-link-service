import { type LinkEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { LinkRepository } from '../repositories';
import Redlock from 'redlock';
import { LinkDoesNotExist } from '@app/shared';

@Injectable()
export class LinkService {
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly redlock: Redlock,
  ) {}

  async create(link: LinkEntity): Promise<{ id: string } & LinkEntity> {
    const { _id, ...result } = await this.linkRepository.save(link);

    return {
      ...result,
      id: _id,
    };
  }

  async get(id: string): Promise<{ id: string } & LinkEntity> {
    const lock = await this.redlock.acquire([id], 5000);
    try {
      const link = await this.linkRepository.findOne({ _id: id });

      if (link == null) {
        throw new LinkDoesNotExist();
      }

      const { _id, ...linkWithOutId } = link;

      await this.linkRepository.deleteById(link);

      return {
        ...linkWithOutId,
        id: _id,
      };
    } finally {
      await lock.release();
    }
  }
}
