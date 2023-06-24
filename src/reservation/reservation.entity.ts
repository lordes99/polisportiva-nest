import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReservationStatus } from '../utils/reservationStatus';
import { User } from '../users/user.entity';
import { SportsField } from '../sportsField/sportsField.entity';

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
}
