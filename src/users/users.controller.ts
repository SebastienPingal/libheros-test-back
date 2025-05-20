import { Controller, Get, Query, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common'
import { UsersService } from './users.service'
import { User, Prisma } from '@prisma/client'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async users(): Promise<User[]> {
    try {
      const users = await this.usersService.getAll()
      return users
    } catch (error) {
      console.error('🔴 Error fetching users:', error)
      throw error
    }
  }

  @Get(':id')
  async user(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.usersService.get({ id })
      if (!user) {
        throw new NotFoundException('User not found')
      }
      return user
    } catch (error) {
      console.error('🔴 Error fetching user:', error)
      throw error
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput): Promise<User> {
    try {
      const user = await this.usersService.updateUser({ where: { id }, data })
      if (!user) {
        throw new NotFoundException('User not found')
      }
      return user
    } catch (error) {
      console.error('🔴 Error updating user:', error)
      throw error
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.usersService.deleteUser({ id })
      if (!user) {
        throw new NotFoundException('User not found')
      }
      return user
    } catch (error) {
      console.error('🔴 Error deleting user:', error)
      throw error
    }
  }
}
