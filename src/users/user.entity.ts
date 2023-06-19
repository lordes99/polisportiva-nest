import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from '../address/address.entity';
import { SportField } from '../sportsField/sportField.entity';
import { SportsFacility } from '../sportsFacility/sportsFacility.entity';

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

  @OneToMany(() => SportField, (sportField) => sportField.user)
  sportFields: SportField[];

  @OneToMany(() => SportsFacility, (sportFacilities) => sportFacilities.user)
  sportFacilities: SportsFacility[];
}
