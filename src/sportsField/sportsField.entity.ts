import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PriceList } from '../priceList/priceList.entity';
import { User } from '../users/user.entity';
import { SportsFacility } from '../sportsFacility/sportsFacility.entity';

@Entity()
export class SportsField {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sport: string;

  @Column()
  isIndoor: boolean;

  // ToDo: Da capire cosa fanno "soccerFieldType" e "tennisFieldType"
  @Column()
  soccerFieldType: string;

  @Column()
  tennisFieldType: string;

  @ManyToOne(() => PriceList, (priceList) => priceList.sportFields)
  priceList: PriceList;

  @ManyToOne(() => User, (user) => user.sportFields)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => SportsFacility,
    (sportsFacility) => sportsFacility.sportFields,
  )
  sportFacility: SportsFacility;
}
