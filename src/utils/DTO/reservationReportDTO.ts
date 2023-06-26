import { SportType } from '../enum/sportType';

export class ReservationReportDTO {
  totalReservations: number;
  sport: SportType;
  totalRevenue: number;
  rejectedReservations: number;
  acceptedReservations: number;
  pendingReservations: number;
}
