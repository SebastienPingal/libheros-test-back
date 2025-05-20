import { BadRequestException, Controller, Get, Post, Body } from '@nestjs/common'
import { TodoListsService } from './todo-lists.service'
import { UsersService } from 'src/users/users.service'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { JwtPayload } from 'src/auth/jwt-payload.interface'
import { Prisma } from '@prisma/client'

@Controller('todo-lists')
export class TodoListsController {
  constructor(
    private readonly todoListsService: TodoListsService,
    private readonly usersService: UsersService,
  ) { }


  @Get()
  async todoLists(@CurrentUser() user: JwtPayload) {
    if (!user) {
      throw new BadRequestException('User not found')
    }
    return this.todoListsService.getAll({ userId: user.sub })
  }

  @Post()
  async createTodoList(@CurrentUser() user: JwtPayload, @Body() data: Prisma.todoListCreateInput) {
    if (!user) {
      throw new BadRequestException('User not found')
    }
    return this.todoListsService.createTodoList({ ...data, user: { connect: { id: user.sub } } })
  }
}