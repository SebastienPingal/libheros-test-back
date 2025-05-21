import { Controller, Delete, Get, Param, Post, Put, Body, NotFoundException } from '@nestjs/common'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { JwtPayload } from 'src/auth/jwt-payload.interface'
import { TodosService } from './todos.service'
import { TodoListsService } from 'src/todo-lists/todo-lists.service'
import { CreateTodoDto } from './dto/createTodo.dto'
import { UpdateTodoDto } from './dto/updateTodo.dto'

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly todoListsService: TodoListsService,
  ) { }

  @Get()
  async getTodos(@CurrentUser() user: JwtPayload) {
    return this.todosService.getAll({ todoList: { userId: user.sub } })
  }

  @Get(':id')
  async getTodo(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.todosService.get({ id, todoList: { userId: user.sub } })
  }

  @Get('todo-list/:id')
  async getTodosByTodoListId(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.todosService.getAll({ todoList: { id } })
  }

  @Post('todo-list/:id')
  async createTodo(@CurrentUser() user: JwtPayload, @Body() createTodoDto: CreateTodoDto, @Param('id') id: string) {
    const todoList = await this.todoListsService.get({ id })
    if (!todoList) {
      throw new NotFoundException('Todo list not found')
    }
    return this.todosService.createTodo({ ...createTodoDto, todoList: { connect: { id } } })
  }

  @Put(':id')
  async updateTodo(@CurrentUser() user: JwtPayload, @Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.updateTodo({ where: { id }, data: updateTodoDto })
  }

  @Delete(':id')
  async deleteTodo(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.todosService.deleteTodo({ id })
  }
}