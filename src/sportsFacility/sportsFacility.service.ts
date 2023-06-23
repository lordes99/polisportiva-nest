import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { SportsFacility } from './sportsFacility.entity';
import { SportsField } from '../sportsField/sportsField.entity';
import { CreateSportsFacilityDto } from './sportsFacility.dto';
import { User } from '../users/user.entity';
import { Address } from '../address/address.entity';

@Injectable()
export class SportsFacilityService {
  constructor(
    @InjectRepository(SportsFacility)
    private sportsFacilityRepository: Repository<SportsFacility>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  // ToDo: refactor del codice
  async createSportFacility(
    sportsFacility: SportsFacility,
  ): Promise<SportsFacility> {
    // const options: FindOneOptions<User> = {
    //   where: { id: createSportsFacilityDto.owner.id },
    //   // relations: ['relationName'], // Se necessario, puoi specificare anche le relazioni da caricare
    // };

    // const user = await this.userRepository.findOne(options);
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }

    sportsFacility.address = await this.addressRepository.save(
      sportsFacility.address,
    );
    return this.sportsFacilityRepository.save(sportsFacility);
  }

  async findAllSportsFacilities(): Promise<SportsFacility[]> {
    return this.sportsFacilityRepository.find();
  }

  async createSportField(
    facilityId: number,
    sportsField: SportsField,
  ): Promise<null> {
    return null;
    // return this.sportsFacilityRepository.save(sp);
  }
}
