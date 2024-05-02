import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TasksModule } from 'src/tasks/tasks.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';

const taskArray = [
  {
    name: 'Task 1',
    description: 'Description 1',
  },
  {
    name: 'Task 2',
    description: 'Description 2',
  },
];

const oneTask = {
  name: 'Task 1',
  description: 'Description 1',
};

const updatedTask = {
  name: 'Task 1',
  description: 'Description 1',
};

const userArray = [
  {
    username: 'jsmith',
    first_name: 'John',
    last_name: 'Doe',
  },
  {
    username: 'jdoe',
    first_name: 'Jane',
    last_name: 'Doe',
  },
];

const oneUser = {
  username: 'jsmith',
  first_name: 'John',
  last_name: 'Doe',
};

const updatedUser = {
  username: 'jsmith',
  first_name: 'John',
  last_name: 'Smith',
};

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const mockTasksRepository = {
    find: jest.fn().mockResolvedValue(taskArray),
    findOne: jest.fn().mockResolvedValue(oneTask),
    create: jest.fn().mockReturnValue(oneTask),
    save: jest.fn().mockResolvedValue(oneTask),
    update: jest.fn().mockResolvedValue(updatedTask),
    remove: jest.fn().mockResolvedValue({}),
  };

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(userArray),
    findOne: jest.fn().mockResolvedValue(oneUser),
    create: jest.fn().mockReturnValue(oneUser),
    save: jest.fn().mockResolvedValue(oneUser),
    update: jest.fn().mockResolvedValue(updatedUser),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TasksModule],
    })
      .overrideProvider(getRepositoryToken(Task))
      .useValue(mockTasksRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users/:user_id/tasks (POST)', () => {
    return request(app.getHttpServer())
      .post('/users/1/tasks')
      .send(oneTask)
      .expect(201)
      .expect(oneTask);
  });

  it('/users/:user_id/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1/tasks')
      .expect(200)
      .expect(taskArray);
  });

  it('/users/:user_id/tasks/:task_id (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1/tasks/1')
      .expect(200)
      .expect(oneTask);
  });

  it('/users/:user_id/tasks/:task_id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/users/1/tasks/1')
      .send(updatedTask)
      .expect(200)
      .expect(updatedTask);
  });

  it('/users/:user_id/tasks/:task_id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/users/1/tasks/1')
      .expect(200)
      .expect({});
  });

  afterAll(async () => {
    await app.close();
  });
});
