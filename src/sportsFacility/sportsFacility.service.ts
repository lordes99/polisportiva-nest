import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SportsFacility } from './sportsFacility.entity';
import { SportsField } from '../sportsField/sportsField.entity';
import { User } from '../users/user.entity';
import { Address } from '../address/address.entity';
import { PriceList } from '../priceList/priceList.entity';
import { ReservationSummaryDTO } from '../utils/DTO/reservationSummaryDTO';
import { Reservation } from '../reservation/reservation.entity';
import { ReservationReportDTO } from '../utils/DTO/reservationReportDTO';
import { SportType } from '../utils/enum/sportType';
import { ReservationStatus } from '../utils/enum/reservationStatus';

const VOLLEYBALL_INDEX = 0;
const SOCCER_INDEX = 1;
const BASKET_INDEX = 2;
const TENNIS_INDEX = 3;

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
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
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
    const sportFacility = await this.sportsFacilityRepository.findOne({
      where: { id: facilityId },
      relations: ['user'],
    });
    if (sportFacility) {
      sportsField.sportFacility = sportFacility;

      this.assignUserToSportField(sportsField, sportFacility);
    } else {
      throw new NotFoundException(
        'No sport facility found for the specified ID',
      );
    }

    this.assignEmptyFieldsType(sportsField);
    sportsField.priceList = await this.priceListRepository.save(
      sportsField.priceList,
    );

    return this.sportsFieldRepository.save(sportsField);
  }

  private assignUserToSportField(
    sportsField: SportsField,
    sportFacility: SportsFacility,
  ) {
    sportsField.user = sportFacility.user;
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

  async createReservationSummary(
    facilityId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<ReservationSummaryDTO> {
    const reservationSummary: ReservationSummaryDTO =
      this.buildReservationSummary(facilityId, startDate, endDate);

    const facility: SportsFacility | null =
      await this.sportsFacilityRepository.findOne({
        where: { id: facilityId },
        relations: ['sportFields'],
      });

    if (!facility) {
      throw new NotFoundException(`Facility with ID ${facilityId} not found`);
    }
    const allReservationForFacility: Reservation[] = [];
    for (const sp of facility.sportFields) {
      const reservations: Reservation[] = await this.reservationRepository.find(
        {
          where: { sportsField: sp },
          relations: ['sportsField'],
        },
      );

      allReservationForFacility.push(...reservations);
    }

    if (allReservationForFacility.length > 0) {
      this.countReservation(allReservationForFacility, reservationSummary);
    }

    return reservationSummary;
  }

  private countReservation(
    reservations: Reservation[],
    reservationSummary: ReservationSummaryDTO,
  ) {
    for (const res of reservations) {
      if (
        this.checkDateIsInRange(
          res.startDate,
          res.endDate,
          reservationSummary.startDate,
          reservationSummary.endDate,
        )
      ) {
        const reservationReportDTO =
          reservationSummary.sportsReservationReports[
            this.chooseSport(res.sportsField.sport)
          ];
        reservationReportDTO.totalReservations += 1;
        reservationReportDTO.totalRevenue += res.price;
        switch (res.state) {
          case ReservationStatus.ACCEPTED: {
            reservationReportDTO.acceptedReservations += 1;
            break;
          }
          case ReservationStatus.PENDING: {
            reservationReportDTO.pendingReservations += 1;
            break;
          }
          case ReservationStatus.REJECTED: {
            reservationReportDTO.rejectedReservations += 1;
            break;
          }
        }
      }
    }
  }

  private checkDateIsInRange(
    dateToCheckStart: Date,
    dateToCheckEnd: Date,
    startDate: Date,
    endDate: Date,
  ): boolean {
    let result = true;
    if (startDate && endDate) {
      result = this.checkDate(dateToCheckStart, startDate, endDate);
    }
    return result;
  }

  private checkDate(
    dateToCheck: Date,
    startDate: Date,
    endDate: Date,
  ): boolean {
    return dateToCheck >= startDate && dateToCheck <= endDate;
  }

  private chooseSport(sportsField: SportType): number {
    switch (sportsField) {
      case SportType.TENNIS:
        return TENNIS_INDEX;
      case SportType.SOCCER:
        return SOCCER_INDEX;
      case SportType.BASKET:
        return BASKET_INDEX;
      case SportType.VOLLEYBALL:
        return VOLLEYBALL_INDEX;
    }
  }

  private buildFirstReport(sportType: SportType): ReservationReportDTO {
    const reservationReport: ReservationReportDTO = new ReservationReportDTO();
    reservationReport.totalReservations = 0;
    reservationReport.sport = sportType;
    reservationReport.totalRevenue = 0;
    reservationReport.rejectedReservations = 0;
    reservationReport.acceptedReservations = 0;
    reservationReport.pendingReservations = 0;
    return reservationReport;
  }

  private buildReservationSummary(
    facilityId: number,
    startDate: Date,
    endDate: Date,
  ): ReservationSummaryDTO {
    const reservationSummary = new ReservationSummaryDTO();
    reservationSummary.sportsFacilityID = facilityId;
    if (startDate) {
      reservationSummary.startDate = new Date(startDate);
    }
    if (endDate) {
      reservationSummary.endDate = new Date(endDate);
    }
    reservationSummary.createAt = new Date();
    reservationSummary.sportsReservationReports = [
      this.buildFirstReport(SportType.VOLLEYBALL),
      this.buildFirstReport(SportType.SOCCER),
      this.buildFirstReport(SportType.BASKET),
      this.buildFirstReport(SportType.TENNIS),
    ];

    return reservationSummary;
  }
}
