import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    createUser: jest.fn().mockResolvedValue(oneUser),
    getAllUsers: jest.fn().mockResolvedValue(userArray),
    getUser: jest.fn().mockResolvedValue(oneUser),
    updateUser: jest.fn().mockResolvedValue(updatedUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      expect(await controller.createUser(oneUser)).toEqual(oneUser);
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      expect(await controller.getAllUsers()).toEqual(userArray);
    });
  });

  describe('getUser', () => {
    it('should return a user', async () => {
      expect(await controller.getUser('1')).toEqual(oneUser);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      expect(await controller.updateUser('1', updatedUser)).toEqual(
        updatedUser,
      );
    });
  });
});
