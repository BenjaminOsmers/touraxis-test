import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  // @desc: Update user info
  // @route: PATCH /users/:id
  // @access: Public
  @Put(':id')
  @ApiResponse({
    status: 200,
    type: UserDto,
    description: 'The user has been successfully updated.',
  })
  @ApiBody({ type: UpdateUserDto, description: 'The user to be updated.' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(+id, updateUserDto);
  }
}
