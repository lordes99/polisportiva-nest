import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsField } from './sportsField.entity';
import { SportsFieldService } from './sportsField.service';
import { SportsFieldController } from './sportsField.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SportsField])],
  providers: [SportsFieldService],
  controllers: [SportsFieldController],
})
export class SportsFieldModule {}
