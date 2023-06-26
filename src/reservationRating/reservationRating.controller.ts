import { Controller, Get, Res } from '@nestjs/common';
import { ReservationRatingService } from './reservationRating.service';
import { Response } from 'express';

@Controller('api/ratings')
export class ReservationRatingController {
  constructor(
    private readonly reservationRatingService: ReservationRatingService,
  ) {}

  @Get()
  async getAllReservationRatings(@Res() res: Response): Promise<Response> {
    try {
      const reservationRatings =
        await this.reservationRatingService.findAllReservationRatings();
      if (reservationRatings && reservationRatings.length > 0) {
        return res.status(200).json(reservationRatings);
      } else {
        return res
          .status(404)
          .json({ message: 'ReservationRatings not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(error.status).json({ message: error.message });
    }
  }
}
