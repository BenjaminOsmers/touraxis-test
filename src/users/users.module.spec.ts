import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersModule', () => {
  let module: TestingModule;

  const mockUsersRepository = {};

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    await module.init();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  it('should have Todo components', async () => {
    expect(module.get(UsersController)).toBeInstanceOf(UsersController);
    expect(module.get(UsersService)).toBeInstanceOf(UsersService);
  });
});
