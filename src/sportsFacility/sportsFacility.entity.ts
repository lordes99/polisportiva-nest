import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../address/address.entity';
import { User } from '../users/user.entity';
import { SportField } from '../sportsField/sportField.entity';

@Entity()
export class SportsFacility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  totalSportsFields: number;

  @Column()
  phone: string;

  @ManyToOne(() => Address, (address) => address.sportFacilities)
  address: Address;

  @ManyToOne(() => User, (user) => user.sportFacilities)
  user: User;

  @OneToMany(() => SportField, (sportField) => sportField.sportFacility)
  sportFields: SportField[];
}
