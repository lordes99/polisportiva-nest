import { Body, Controller, Post, Res } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Response } from 'express';
import { CreateReservationDto } from './reservation.dto';

@Controller('api/reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const newReservation = await this.reservationService.createReservation(createReservationDto);
      return res.status(200).json(newReservation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
