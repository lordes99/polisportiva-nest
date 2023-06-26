import { Controller, Get, Query, Res } from '@nestjs/common';
import { SportsFieldService } from './sportsField.service';
import { Response } from 'express';
import { SportType } from '../utils/enum/sportType';

@Controller('api/sports-fields')
export class SportsFieldController {
  constructor(private readonly sportsFieldService: SportsFieldService) {}

  @Get()
  async getAllSportsFields(
    @Query('filter_by_owner_id') ownerId: number,
    @Query('filter_by_sport') sport: SportType,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      if (ownerId || sport) {
        const sportsFields = await this.sportsFieldService.findSportOrOwnerId(
          ownerId,
          sport,
        );
        if (sportsFields !== null && sportsFields.length > 0) {
          return res.status(200).json(sportsFields);
        } else
          return res.status(404).json({ message: 'SportsFields not found' });
      } else {
        const sportsFields = await this.sportsFieldService.findAll();
        if (sportsFields !== null && sportsFields.length > 0) {
          return res.status(200).json(sportsFields);
        } else
          return res.status(404).json({ message: 'SportsFields not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(error.status).json({ message: error.message });
    }
  }
}
