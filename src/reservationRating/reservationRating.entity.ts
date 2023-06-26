import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from '../reservation/reservation.entity';

@Entity()
export class ReservationRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  description: string;

  @ManyToOne(() => Reservation, (reservation) => reservation.reservationRatings)
  reservation: Reservation;
}
