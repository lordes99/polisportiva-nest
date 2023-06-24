import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../address/address.entity';
import { SportsField } from '../sportsField/sportsField.entity';
import { SportsFacility } from '../sportsFacility/sportsFacility.entity';
import { Reservation } from '../reservation/reservation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  fiscalCode: string;

  @ManyToOne(() => Address, (address) => address.users)
  address: Address;

  @OneToMany(() => SportsField, (sportField) => sportField.user)
  sportFields: SportsField[];

  @OneToMany(() => SportsFacility, (sportFacilities) => sportFacilities.user)
  sportFacilities: SportsFacility[];

  @OneToMany(() => Reservation, (reservation) => reservation.sportsField)
  reservations: Reservation[];
}
