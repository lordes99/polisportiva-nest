import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { User } from '../users/user.entity';
import { SportsField } from '../sportsField/sportsField.entity';
import { ReservationRating } from '../reservationRating/reservationRating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      User,
      SportsField,
      ReservationRating,
    ]),
  ],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
