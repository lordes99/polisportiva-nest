import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Address } from './address/address.entity';
import { PriceList } from './priceList/priceList.entity';
import { SportField } from './sportsField/sportField.entity';
import { SportsFacility } from './sportsFacility/sportsFacility.entity';

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
        entities: [User, Address, PriceList, SportField, SportsFacility],
        synchronize: true,
      }),
      inject: [ConfigService], // Inietta il ConfigService nella factory function
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
