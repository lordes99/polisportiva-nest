import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SportsField } from '../sportsField/sportsField.entity';

@Entity()
export class PriceList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pricePerHour: number;

  @OneToMany(() => SportsField, (sportField) => sportField.priceList)
  sportFields: SportsField[];
}
