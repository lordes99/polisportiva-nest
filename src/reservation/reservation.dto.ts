class DateRangeDto {
  startDate: string;

  endDate: string;
}

export class CreateReservationDto {
  sportsFieldId: number;

  ownerId: number;

  dateRange: DateRangeDto;
}
