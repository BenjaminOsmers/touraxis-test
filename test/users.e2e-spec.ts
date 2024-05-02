import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './../src/users/entities/user.entity';

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

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(userArray),
    findOne: jest.fn().mockResolvedValue(oneUser),
    create: jest.fn().mockReturnValue(oneUser),
    save: jest.fn().mockResolvedValue(oneUser),
    update: jest.fn().mockResolvedValue(updatedUser),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(oneUser)
      .expect(201)
      .expect(oneUser);
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(userArray);
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect(oneUser);
  });

  it('/users/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/users/1')
      .send(updatedUser)
      .expect(200)
      .expect(updatedUser);
  });

  afterAll(async () => {
    await app.close();
  });
});
