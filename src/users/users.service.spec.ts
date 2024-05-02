import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockReturnValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user and return the user', async () => {
      const user = await service.createUser(oneUser);
      expect(user).toEqual(oneUser);
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users = await service.getAllUsers();
      expect(users).toEqual(userArray);
    });
  });

  describe('getUser', () => {
    it('should return a single user', async () => {
      const user = await service.getUser(1);
      expect(user).toEqual(oneUser);
    });

    it('should throw an error if the user is not found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.getUser(1)).rejects.toThrow();
    });
  });

  describe('updateUser', () => {
    it('should update a user and return the updated user', async () => {
      const user = await service.updateUser(1, updatedUser);
      expect(user).toEqual(updatedUser);
    });

    it('should throw an error if the user is not found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.updateUser(1, updatedUser)).rejects.toThrow();
    });
  });
});
