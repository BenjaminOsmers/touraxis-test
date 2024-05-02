import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async createTask(
    userId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const user = await this.usersService.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const task = this.tasksRepository.create({
      ...createTaskDto,
      user,
    });

    return await this.tasksRepository.save(task);
  }

  async getUserTasks(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: {
        user: { id: userId },
      },
    });
  }

  async getTaskDetails(userId: number, taskId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: {
        id: taskId,
        user: { id: userId },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async updateTask(
    userId: number,
    taskId: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: {
        id: taskId,
        user: { id: userId },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async deleteTask(userId: number, taskId: number): Promise<void> {
    const task = await this.tasksRepository.findOne({
      where: {
        id: taskId,
        user: { id: userId },
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.tasksRepository.remove(task);
  }
}
