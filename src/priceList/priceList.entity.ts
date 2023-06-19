import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SportField } from '../sportsField/sportField.entity';

@Entity()
export class PriceList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pricePerHour: number;

  @OneToMany(() => SportField, (sportField) => sportField.priceList)
  sportFields: SportField[];
}
