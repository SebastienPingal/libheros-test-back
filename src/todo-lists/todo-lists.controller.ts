import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { TodoListsService } from './todo-lists.service'
import { CurrentUser } from '../auth/current-user.decorator'
import { JwtPayload } from '../auth/jwt-payload.interface'
import { Prisma } from '@prisma/client'

@Controller('todo-lists')
export class TodoListsController {
  constructor(
    private readonly todoListsService: TodoListsService,
  ) { }

  @Get()
  async todoLists(@CurrentUser() user: JwtPayload) {
    return this.todoListsService.getAll({ userId: user.sub })
  }

  @Get(':id')
  async getTodoList(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.todoListsService.get({ id })
  }

  @Post()
  async createTodoList(@CurrentUser() user: JwtPayload, @Body() data: Prisma.todoListCreateInput) {
    return this.todoListsService.createTodoList({ ...data, user: { connect: { id: user.sub } } })
  }

  @Put(':id')
  async updateTodoList(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() data: Prisma.todoListUpdateInput) {
    return this.todoListsService.updateTodoList({ where: { id }, data })
  }

  @Delete(':id')
  async deleteTodoList(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.todoListsService.deleteTodoList({ id })
  }
}