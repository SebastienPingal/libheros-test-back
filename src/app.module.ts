import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TodoListsController } from './todo-lists/todo-lists.controller';
import { TodoListsService } from './todo-lists/todo-lists.service';
import { TodoListsModule } from './todo-lists/todo-lists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule,
    AuthModule,
    UsersModule,
    TodoListsModule,
  ],
  controllers: [AppController, TodoListsController],
  providers: [
    AppService,
    TodoListsService,
  ],
})
export class AppModule { }
