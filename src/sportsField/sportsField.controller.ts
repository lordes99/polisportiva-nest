import { Controller, Get, Res } from '@nestjs/common';
import { SportsFieldService } from './sportsField.service';
import { Response } from 'express';

@Controller('api/sports-fields')
export class SportsFieldController {
  constructor(private readonly sportsFieldService: SportsFieldService) {}

  @Get()
  async getSportsFields(@Res() res: Response): Promise<Response> {
    const sportsFields = await this.sportsFieldService.findAll();
    if (sportsFields !== null && sportsFields.length > 0) {
      return res.status(200).json(sportsFields);
    } else return res.status(404).json({ message: 'SportsFields not found' });
  }
}
