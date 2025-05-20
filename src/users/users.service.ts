import { Injectable } from '@nestjs/common';

export type User = {
  userId: number
  username: string
  password: string
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'Boby',
      password: 'Boby123',
    },
    {
      userId: 2,
      username: 'Josianne',
      password: 'Josianne123',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }
}
