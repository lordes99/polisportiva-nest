import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { SportsFacilityService } from './sportsFacility.service';
import { Response } from 'express';
import { SportsFacility } from './sportsFacility.entity';
import { SportsField } from '../sportsField/sportsField.entity';
import { CreateSportsFacilityDto } from './sportsFacility.dto';

@Controller('api/sports-facilities')
export class SportsFacilityController {
  constructor(private readonly sportsFacilityService: SportsFacilityService) {}

  @Post()
  async createSportFacility(
    @Body() sportsFacility: SportsFacility,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const newSportsFacility =
        await this.sportsFacilityService.createSportFacility(
          sportsFacility,
        );
      return res.status(200).json(newSportsFacility);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get()
  async getAllSportsFacilities(@Res() res: Response): Promise<Response> {
    const sportsFacilities =
      await this.sportsFacilityService.findAllSportsFacilities();
    if (sportsFacilities !== null && sportsFacilities.length > 0) {
      return res.status(200).json(sportsFacilities);
    } else
      return res.status(404).json({ message: 'SportsFacilities not found' });
  }

  @Post(':facility-id/sports-fields')
  async createSportField(
    @Param('facility-id') facilityId: number,
    @Body() sportsField: SportsField,
    @Res() res: Response,
  ): Promise<Response> {
    const newSportsField = await this.sportsFacilityService.createSportField(
      facilityId,
      sportsField,
    );
    return res;
  }
}
