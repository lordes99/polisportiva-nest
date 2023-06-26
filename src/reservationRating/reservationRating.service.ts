import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationRating } from './reservationRating.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationRatingService {
  constructor(
    @InjectRepository(ReservationRating)
    private reservationRatingRepository: Repository<ReservationRating>,
  ) {}

  async findAllReservationRatings(): Promise<ReservationRating[]> {
    return this.reservationRatingRepository.find();
  }
}
