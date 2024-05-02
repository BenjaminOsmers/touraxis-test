import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

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

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    createTask: jest.fn().mockResolvedValue(oneTask),
    getUserTasks: jest.fn().mockResolvedValue(taskArray),
    getTaskDetails: jest.fn().mockResolvedValue(oneTask),
    updateTask: jest.fn().mockResolvedValue(updatedTask),
    deleteTask: jest.fn().mockResolvedValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    })
      .overrideProvider(TasksService)
      .useValue(mockTasksService)
      .compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      expect(await controller.createTask('1', oneTask)).toEqual(oneTask);
    });
  });

  describe('getUserTasks', () => {
    it('should return an array of tasks', async () => {
      expect(await controller.getUserTasks('1')).toEqual(taskArray);
    });
  });

  describe('getTaskDetails', () => {
    it('should return a task', async () => {
      expect(await controller.getTaskDetails('1', '1')).toEqual(oneTask);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      expect(await controller.updateTask('1', '1', oneTask)).toEqual(
        updatedTask,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      expect(await controller.deleteTask('1', '1')).toEqual(null);
    });
  });
});
