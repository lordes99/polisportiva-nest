import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Response } from 'express';
import { CreateReservationDto } from './reservation.dto';
import { ReservationStatus } from '../utils/reservationStatus';
import { ReservationRating } from '../reservationRating/reservationRating.entity';

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
      return res.status(error.status).json({ message: error.message });
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
      return res.status(error.status).json({ message: error.message });
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
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Put(':id/status')
  async changeReservationStatus(
    @Param('id') reservationId: number,
    @Body('state') state: ReservationStatus,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const reservation = await this.reservationService.changeStatus(
        reservationId,
        state,
      );
      if (reservation) {
        return res.status(200).json({ message: 'reservation updated' });
      } else {
        return res.status(404).json({ message: 'reservation not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Post(':id/rating')
  async createRating(
    @Param('id') reservationId: number,
    @Body() reservationRating: ReservationRating,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const newReservationRating =
        await this.reservationService.createReservationRating(
          reservationId,
          reservationRating,
        );
      return res.status(200).json(newReservationRating);
    } catch (error) {
      console.error(error);
      return res.status(error.status).json({ message: error.message });
    }
  }

  // ToDo: reservation/id
}
