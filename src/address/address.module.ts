import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/user.service';
import { UsersController } from '../users/user.controller';
import { Address } from './address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  // providers: [UsersService],
  // controllers: [UsersController],
})
export class AddressModule {}
