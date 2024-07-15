import { Injectable, type OnModuleInit } from '@nestjs/common';
import { InjectCollection } from 'nestjs-mongodb-native';
import { type User } from '../entities';
import { Collection, addId, type StringId } from '@app/mongodb';
import { UserAlreadyExistError } from '@app/shared';

@Injectable()
export class UserRepository implements OnModuleInit {
  constructor(
    @InjectCollection(`users`)
    private readonly collection: Collection<User & StringId>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.collection.createIndex({ email: 1 }, { unique: true });
  }

  async deleteById(params: StringId): Promise<void> {
    await this.collection.deleteOne(params);
  }

  async findOne(
    filter: Partial<User & StringId>,
  ): Promise<(User & StringId) | null> {
    return this.collection.findOne(filter);
  }

  async save(user: User): Promise<User & StringId> {
    const existingUser = await this.findOne({ email: user.email });

    if (existingUser != null) {
      throw new UserAlreadyExistError();
    }

    const result = await this.collection.insertOne(addId(user));

    return {
      ...user,
      _id: result.insertedId,
    };
  }
}
