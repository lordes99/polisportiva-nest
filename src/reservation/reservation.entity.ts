import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationStatus } from '../utils/enum/reservationStatus';
import { User } from '../users/user.entity';
import { SportsField } from '../sportsField/sportsField.entity';
import { ReservationRating } from '../reservationRating/reservationRating.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  createdAt: Date;

  @Column()
  state: ReservationStatus;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => SportsField, (sportsField) => sportsField.reservations)
  sportsField: SportsField;

  @OneToMany(
    () => ReservationRating,
    (reservationRating) => reservationRating.reservation,
  )
  reservationRatings: ReservationRating[];
}
