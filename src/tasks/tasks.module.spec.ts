import { Test, TestingModule } from '@nestjs/testing';
import { TasksModule } from './tasks.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

describe('TasksModule', () => {
  let module: TestingModule;

  const tasksRepositoryMock = {};
  const usersRepositoryMock = {};

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TasksModule],
    })
      .overrideProvider(getRepositoryToken(Task))
      .useValue(tasksRepositoryMock)
      .overrideProvider(getRepositoryToken(User))
      .useValue(usersRepositoryMock)
      .compile();

    await module.init();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  it('should have Todo components', async () => {
    expect(module.get(TasksController)).toBeInstanceOf(TasksController);
    expect(module.get(TasksService)).toBeInstanceOf(TasksService);
  });
});
