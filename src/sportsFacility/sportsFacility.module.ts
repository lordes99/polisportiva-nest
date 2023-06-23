import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsFacility } from './sportsFacility.entity';
import { SportsFacilityService } from './sportsFacility.service';
import { SportsFacilityController } from './sportsFacility.controller';
import { User } from '../users/user.entity';
import { Address } from '../address/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SportsFacility, User, Address])],
  providers: [SportsFacilityService],
  controllers: [SportsFacilityController],
})
export class SportsFacilityModule {}
