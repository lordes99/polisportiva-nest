import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { SportsFacility } from './sportsFacility.entity';
import { SportsField } from '../sportsField/sportsField.entity';
import { User } from '../users/user.entity';
import { Address } from '../address/address.entity';
import { PriceList } from '../priceList/priceList.entity';

@Injectable()
export class SportsFacilityService {
  constructor(
    @InjectRepository(SportsFacility)
    private sportsFacilityRepository: Repository<SportsFacility>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(SportsField)
    private sportsFieldRepository: Repository<SportsField>,
    @InjectRepository(PriceList)
    private priceListRepository: Repository<PriceList>,
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
  ): Promise<SportsField> {
    const sportFacility = new SportsFacility();
    sportFacility.id = facilityId;
    sportsField.sportFacility = sportFacility;
    this.assignEmptyFieldsType(sportsField);
    sportsField.priceList = await this.priceListRepository.save(
      sportsField.priceList,
    );

    return this.sportsFieldRepository.save(sportsField);
  }

  private assignEmptyFieldsType(sportsField: SportsField) {
    sportsField.soccerFieldType = '';
    sportsField.tennisFieldType = '';
  }

  async deleteSportsFacilityById(id: number) {
    return this.sportsFacilityRepository.delete(id);
  }

  async findSportsFacilityByUserId(userId: number): Promise<SportsFacility[]> {
    const sportFacilities = await this.sportsFacilityRepository.find({
      where: { user: { id: userId } },
      relations: ['address', 'user', 'sportFields'],
    });

    if (sportFacilities.length === 0) {
      throw new NotFoundException(
        'No sport facilities found for the specified user ID',
      );
    }
    return sportFacilities;
  }
}
