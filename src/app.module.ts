import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Address } from './address/address.entity';
import { PriceList } from './priceList/priceList.entity';
import { SportsField } from './sportsField/sportsField.entity';
import { SportsFacility } from './sportsFacility/sportsFacility.entity';
import { SportsFieldModule } from './sportsField/sportsField.module';
import { SportsFacilityModule } from './sportsFacility/sportsFacility.module';
import { Reservation } from './reservation/reservation.entity';
import { ReservationModule } from './reservation/reservation.module';
import { ReservationRating } from './reservationRating/reservationRating.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: 5432,
        username: 'admin',
        password: 'admin',
        database: 'polisportiva',
        entities: [
          User,
          Address,
          PriceList,
          SportsField,
          SportsFacility,
          Reservation,
          ReservationRating,
        ],
        synchronize: true,
      }),
      inject: [ConfigService], // Inietta il ConfigService nella factory function
    }),
    UsersModule,
    SportsFieldModule,
    SportsFacilityModule,
    ReservationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
