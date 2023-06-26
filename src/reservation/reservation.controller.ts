import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
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
      const newReservation = await this.reservationService.createReservation(
        createReservationDto,
      );
      return res.status(200).json(newReservation);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get()
  async getAllReservations(@Res() res: Response): Promise<Response> {
    try {
      const reservations = await this.reservationService.findAllReservations();
      if (reservations && reservations.length > 0) {
        return res.status(200).json(reservations);
      } else {
        return res.status(404).json({ message: 'Reservations not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Delete(':id')
  async deleteReservation(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const reservation = await this.reservationService.deleteReservation(id);
      if (reservation) {
        return res.status(200).json({ message: 'reservation Deleted' });
      } else {
        return res.status(404).json({ message: 'reservation not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  // ToDo: fare creaReservationRating da una reservation
  // ToDo: aggiorna stato reservation PUT
  // ToDo: reservation/id
}
