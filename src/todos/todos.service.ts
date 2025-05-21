import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) { }

  async get(todoWhereUniqueInput: Prisma.TodoWhereUniqueInput): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: todoWhereUniqueInput,
    })
  }

  async getAll(todoWhereInput: Prisma.TodoWhereInput): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      where: todoWhereInput,
    })
  }

  async createTodo(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    })
  }

  async updateTodo(params: {
    where: Prisma.TodoWhereUniqueInput
    data: Prisma.TodoUpdateInput
  }): Promise<Todo> {
    const { where, data } = params
    return this.prisma.todo.update({
      where,
      data,
    })
  }

  async deleteTodo(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prisma.todo.delete({
      where,
    })
  }
}
