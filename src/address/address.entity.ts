import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { SportsFacility } from '../sportsFacility/sportsFacility.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  streetName: string;

  @Column()
  streetNumber: string;

  @Column()
  postcode: string;

  @OneToMany(() => User, (user) => user.address)
  users: User[];

  @OneToMany(() => SportsFacility, (sportFacilities) => sportFacilities.address)
  sportFacilities: SportsFacility[];
}
