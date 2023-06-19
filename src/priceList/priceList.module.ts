import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceList } from './priceList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriceList])],
  // providers: [UsersService],
  // controllers: [UsersController],
})
export class PriceListModule {}
