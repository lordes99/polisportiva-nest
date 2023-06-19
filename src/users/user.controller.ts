import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { Response } from 'express';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Body() user: User,
    @Res() res: Response,
  ): Promise<Response> {
    const newUser = await this.userService.createUser(user);
    return res.json(newUser);
  }

  @Get()
  async getUsers(@Res() res: Response): Promise<Response> {
    const users = await this.userService.findAll();
    if (users !== null && users.length > 0) {
      return res.status(200).json(users);
    } else return res.status(404).json({ message: 'User not found' });
  }
  @Get(':id')
  async getUser(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.findOne(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.deleteUserByid(id);
    if (user) {
      return res.status(200).json({ message: 'User Deleted' });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  }
}
