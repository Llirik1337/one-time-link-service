import { addId, Collection, type StringId } from '@app/mongodb';
import { Injectable } from '@nestjs/common';
import { InjectCollection } from 'nestjs-mongodb-native';
import { type LinkEntity } from '../entities';

@Injectable()
export class LinkRepository {
  constructor(
    @InjectCollection(`links`)
    private readonly collection: Collection<LinkEntity & StringId>,
  ) {}

  async deleteById(params: StringId): Promise<void> {
    await this.collection.deleteOne(params);
  }

  async findOne(
    filter: Partial<LinkEntity & StringId>,
  ): Promise<(LinkEntity & StringId) | null> {
    return this.collection.findOne(filter);
  }

  async save(link: LinkEntity): Promise<LinkEntity & StringId> {
    const result = await this.collection.insertOne(addId(link));

    return {
      ...link,
      _id: result.insertedId,
    };
  }
}
