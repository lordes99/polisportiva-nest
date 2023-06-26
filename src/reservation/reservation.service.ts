import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './reservation.dto';
import { User } from '../users/user.entity';
import { SportsField } from '../sportsField/sportsField.entity';
import { ReservationStatus } from '../utils/reservationStatus';
import { ReservationRating } from '../reservationRating/reservationRating.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SportsField)
    private sportsFieldRepository: Repository<SportsField>,
    @InjectRepository(ReservationRating)
    private reservationRatingRepository: Repository<ReservationRating>,
  ) {}

  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const sportField = await this.sportsFieldRepository.findOne({
      where: { id: createReservationDto.sportsFieldId },
      // relations: ['user'],
    });

    if (!sportField) {
      throw new NotFoundException('No sport field found for the specified ID');
    }

    const owner = await this.userRepository.findOne({
      where: { id: createReservationDto.ownerId },
    });

    if (!owner) {
      throw new NotFoundException('No owner found for the specified ID');
    }

    const reservation = this.buildReservation(
      createReservationDto,
      sportField,
      owner,
    );

    return this.reservationRepository.save(reservation);
  }

  private buildReservation(
    createReservationDto: CreateReservationDto,
    sportField: SportsField,
    owner: User,
  ): Reservation {
    const newReservation: Reservation = new Reservation();
    newReservation.user = owner;
    newReservation.sportsField = sportField;
    newReservation.createdAt = new Date();
    newReservation.startDate = new Date(
      createReservationDto.dateRange.startDate,
    );
    newReservation.endDate = new Date(createReservationDto.dateRange.endDate);
    newReservation.state = ReservationStatus.PENDING;
    newReservation.price = 0;

    return newReservation;
  }

  async findAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  deleteReservation(id: number) {
    return this.reservationRepository.delete(id);
  }

  async changeStatus(reservationId: number, state: ReservationStatus) {
    const updateResult = await this.reservationRepository.update(
      reservationId,
      { state },
    );

    if (updateResult.affected === 0) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} not found`,
      );
    }

    return updateResult;
  }

  async createReservationRating(
    reservationId: number,
    reservationRating: ReservationRating,
  ): Promise<ReservationRating> {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      // relations: ['user'],
    });

    if (!reservation) {
      throw new NotFoundException(
        'Reservation with ID ${reservationId} not found',
      );
    }
    reservationRating.reservation = reservation;
    return this.reservationRatingRepository.save(reservationRating);
  }
}
