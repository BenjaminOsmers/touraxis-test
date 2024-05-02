import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

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

const oneUser = {
  username: 'jsmith',
  first_name: 'John',
  last_name: 'Doe',
};

const updatedTask = {
  name: 'Task 1',
  description: 'Description 1',
};

describe('TasksService', () => {
  let service: TasksService;
  let tasksRepository: Repository<Task>;

  const usersServicemock = {
    getUser: jest.fn().mockResolvedValue(oneUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: {
            find: jest.fn().mockResolvedValue(taskArray),
            findOne: jest.fn().mockResolvedValue(oneTask),
            create: jest.fn().mockReturnValue(oneTask),
            save: jest.fn().mockResolvedValue(oneTask),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
        {
          provide: UsersService,
          useValue: {
            getUser: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    })
      .overrideProvider(UsersService)
      .useValue(usersServicemock)
      .compile();

    service = module.get<TasksService>(TasksService);
    tasksRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(tasksRepository).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task and return the task', async () => {
      const task = await service.createTask(1, oneTask);
      expect(task).toEqual(oneTask);
    });

    it('should throw an error when the user does not exist', async () => {
      usersServicemock.getUser.mockResolvedValue(undefined);
      await expect(service.createTask(1, oneTask)).rejects.toThrow();
    });
  });

  describe('getUserTasks', () => {
    it('should return an array of tasks', async () => {
      const tasks = await service.getUserTasks(1);
      expect(tasks).toEqual(taskArray);
    });
  });

  describe('getTaskDetails', () => {
    it('should return a single task', async () => {
      const task = await service.getTaskDetails(1, 1);
      expect(task).toEqual(oneTask);
    });

    it('should throw an error if the task is not found', async () => {
      jest.spyOn(tasksRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.getTaskDetails(1, 1)).rejects.toThrow();
    });
  });

  describe('updateTask', () => {
    it('should update a task and return the updated task', async () => {
      const task = await service.updateTask(1, 1, updatedTask);
      expect(task).toEqual(updatedTask);
    });

    it('should throw an error if the task is not found', async () => {
      jest.spyOn(tasksRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.updateTask(1, 1, updatedTask)).rejects.toThrow();
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      await service.deleteTask(1, 1);
      expect(tasksRepository.remove).toBeCalled();
    });

    it('should throw an error if the task is not found', async () => {
      jest.spyOn(tasksRepository, 'findOne').mockResolvedValue(undefined);
      await expect(service.deleteTask(1, 1)).rejects.toThrow();
    });
  });
});
