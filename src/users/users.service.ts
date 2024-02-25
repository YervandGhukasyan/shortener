import { Inject, Injectable } from '@nestjs/common';
import { users } from './users.model';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private model: typeof users,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.model.findOne<users>({ where: { username } });
  }

  async create(username: string, password: string): Promise<User | undefined> {
    return await this.model.create({ username, password });
  }
}
