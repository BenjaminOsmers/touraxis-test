import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserDto } from './dto/user.dto';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { TaskDto } from 'src/tasks/dto/task.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {}

  // @desc: Create a user
  // @route: POST /users
  // @access: Public
  @Post()
  @ApiResponse({
    status: 201,
    type: UserDto,
    description: 'The user has been successfully created.',
  })
  @ApiBody({ type: CreateUserDto, description: 'The user to be created.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // @desc: Create a task for a user
  // @route: POST /users/:id/tasks
  // @access: Public
  @Post(':user_id/tasks')
  @ApiResponse({
    status: 201,
    type: TaskDto,
    description: 'The task has been successfully created.',
  })
  @ApiBody({ type: CreateTaskDto, description: 'The task to be created.' })
  async createTask(
    @Param('user_id') user_id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(+user_id, createTaskDto);
  }

  // @desc: List all users
  // @route: GET /users
  // @access: Public
  @Get()
  @ApiResponse({
    status: 200,
    type: UserDto,
    isArray: true,
    description: 'The users have been successfully retrieved.',
  })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // @desc: Get user info
  // @route: GET /users/:id
  // @access: Public
  @Get(':id')
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: 'The user has been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(+id);
  }

  // @desc: Get all tasks for a user
  // @route: GET /users/:id/tasks
  // @access: Public
  @Get(':user_id/tasks')
  @ApiResponse({
    status: 200,
    type: TaskDto,
    isArray: true,
    description: 'The tasks have been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserTasks(@Param('user_id') user_id: string) {
    return this.tasksService.getUserTasks(+user_id);
  }

  // @desc: Get task info
  // @route: GET /users/:id/tasks/:task_id
  // @access: Public
  @Get(':user_id/tasks/:task_id')
  @ApiResponse({
    status: 200,
    type: TaskDto,
    description: 'The task has been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async getTaskDetails(
    @Param('user_id') user_id: string,
    @Param('task_id') task_id: string,
  ) {
    return this.tasksService.getTaskDetails(+user_id, +task_id);
  }

  // @desc: Update user info
  // @route: PATCH /users/:id
  // @access: Public
  @Put(':id')
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiBody({ type: UpdateUserDto, description: 'The user to be updated.' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  // @desc: Update a task
  // @route: Put /users/:id/tasks/:task_id
  // @access: Public
  @Put(':user_id/tasks/:task_id')
  @ApiResponse({
    status: 200,
    type: TaskDto,
    description: 'The task has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @ApiBody({ type: UpdateTaskDto, description: 'The task to be updated.' })
  async updateTask(
    @Param('user_id') user_id: string,
    @Param('task_id') task_id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(+user_id, +task_id, updateTaskDto);
  }

  // @desc: Delete a task
  // @route: DELETE /users/:id/tasks/:task_id
  // @access: Public
  @Delete(':user_id/tasks/:task_id')
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async deleteTask(
    @Param('user_id') user_id: string,
    @Param('task_id') task_id: string,
  ) {
    return this.tasksService.deleteTask(+user_id, +task_id);
  }
}
