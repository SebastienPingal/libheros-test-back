import { Test, TestingModule } from '@nestjs/testing';
import { TodoListsController } from './todo-lists.controller';
import { TodoListsService } from './todo-lists.service';
import { JwtPayload } from '../auth/jwt-payload.interface';

const mockUser: JwtPayload = { sub: 'user-id-1', email: 'test@example.com' };

const mockTodoListsService = {
  getAll: jest.fn().mockResolvedValue([{ id: '1', name: 'List 1' }]),
  get: jest.fn().mockResolvedValue({ id: '1', name: 'List 1' }),
  createTodoList: jest.fn().mockResolvedValue({ id: '2', name: 'New List' }),
  updateTodoList: jest.fn().mockResolvedValue({ id: '1', name: 'Updated List' }),
  deleteTodoList: jest.fn().mockResolvedValue({ id: '1', name: 'Deleted List' }),
};

describe('TodoListsController', () => {
  let controller: TodoListsController;
  let service: typeof mockTodoListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoListsController],
      providers: [
        { provide: TodoListsService, useValue: mockTodoListsService },
      ],
    }).compile();

    controller = module.get<TodoListsController>(TodoListsController);
    service = module.get<TodoListsService>(TodoListsService) as any;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all todo lists', async () => {
    const result = await controller.todoLists(mockUser);
    expect(service.getAll).toHaveBeenCalledWith({ userId: mockUser.sub });
    expect(result).toEqual([{ id: '1', name: 'List 1' }]);
  });

  it('should get a todo list by id', async () => {
    const result = await controller.getTodoList(mockUser, '1');
    expect(service.get).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual({ id: '1', name: 'List 1' });
  });

  it('should create a todo list', async () => {
    const data = { name: 'New List' };
    const result = await controller.createTodoList(mockUser, data as any);
    expect(service.createTodoList).toHaveBeenCalledWith({ ...data, user: { connect: { id: mockUser.sub } } });
    expect(result).toEqual({ id: '2', name: 'New List' });
  });

  it('should update a todo list', async () => {
    const data = { name: 'Updated List' };
    const result = await controller.updateTodoList(mockUser, '1', data as any);
    expect(service.updateTodoList).toHaveBeenCalledWith({ where: { id: '1' }, data });
    expect(result).toEqual({ id: '1', name: 'Updated List' });
  });

  it('should delete a todo list', async () => {
    const result = await controller.deleteTodoList(mockUser, '1');
    expect(service.deleteTodoList).toHaveBeenCalledWith({ id: '1' });
    expect(result).toEqual({ id: '1', name: 'Deleted List' });
  });
});

// 🧪 To run these tests, use:
// pnpm test
// or
// npx jest src/todo-lists/todo-lists.controller.spec.ts
