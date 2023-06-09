import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get('{id}')
  async getUser(id: number): Promise<User[]> {
    return this.userService.findAll();
  }
}
