import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { todoList, Prisma } from '@prisma/client';

@Injectable()
export class TodoListsService {
  constructor(private prisma: PrismaService) { }

  async get(
    todoListWhereUniqueInput: Prisma.todoListWhereUniqueInput,
  ): Promise<todoList | null> {
    return this.prisma.todoList.findUnique({
      where: todoListWhereUniqueInput,
    })
  }

  async getAll(todoListWhereInput: Prisma.todoListWhereInput): Promise<todoList[]> {
    return this.prisma.todoList.findMany({
      where: todoListWhereInput,
    })
  }

  async createTodoList(data: Prisma.todoListCreateInput): Promise<todoList> {
    return this.prisma.todoList.create({
      data,
    })
  }

  async updateTodoList(params: {
    where: Prisma.todoListWhereUniqueInput
    data: Prisma.todoListUpdateInput
  }): Promise<todoList> {
    const { where, data } = params
    return this.prisma.todoList.update({
      where,
      data,
    })
  }

  async deleteTodoList(where: Prisma.todoListWhereUniqueInput): Promise<todoList> {
    return this.prisma.todoList.delete({
      where,
    })
  }
}
