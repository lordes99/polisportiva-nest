import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportsField } from './sportsField.entity';
import { SportType } from "../utils/enum/sportType";

@Injectable()
export class SportsFieldService {
  constructor(
    @InjectRepository(SportsField)
    private sportsFieldRepository: Repository<SportsField>,
  ) {}

  async findAll(): Promise<SportsField[]> {
    return this.sportsFieldRepository.find({ relations: ['user'] });
  }

  async findSportOrOwnerId(
    ownerId: number,
    sportType: SportType,
  ): Promise<SportsField[]> {
    const sportFields = await this.sportsFieldRepository.find({
      where: { user: { id: ownerId }, sport: sportType },
      relations: ['user'],
    });
    if (sportFields.length === 0) {
      throw new NotFoundException(
        'No sport fields found for the specified user ID',
      );
    }
    return sportFields;
  }
}
