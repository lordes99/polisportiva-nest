import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../reservation/reservation.entity';
import { ReservationRating } from './reservationRating.entity';
import { ReservationRatingController } from './reservationRating.controller';
import { ReservationRatingService } from './reservationRating.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ReservationRating])],
  providers: [ReservationRatingService],
  controllers: [ReservationRatingController],
})
export class ReservationRatingModule {}
