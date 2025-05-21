import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TodoListsModule } from './todo-lists/todo-lists.module';
import { TodosService } from './todos/todos.service';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    AuthModule,
    UsersModule,
    TodoListsModule,
    TodosModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, TodosService],
})
export class AppModule { }
