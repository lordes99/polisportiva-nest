import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportsField } from './sportsField.entity';

@Injectable()
export class SportsFieldService {
  constructor(
    @InjectRepository(SportsField)
    private sportsFieldRepository: Repository<SportsField>,
  ) {}

  async findAll(): Promise<SportsField[]> {
    return this.sportsFieldRepository.find();
  }
}
