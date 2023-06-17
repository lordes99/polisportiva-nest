import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../address/address.entity';

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
}
