import { ReservationReportDTO } from './reservationReportDTO';

export class ReservationSummaryDTO {
  sportsFacilityID: number;
  startDate: Date;
  endDate: Date;
  createAt: Date;
  sportsReservationReports: ReservationReportDTO[];
}
