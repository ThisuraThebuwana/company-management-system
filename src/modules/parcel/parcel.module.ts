import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CsvModule } from 'nest-csv-parser'
import { ParcelController } from './parcel.controller';
import { ParcelService } from './parcel.service';
import { ParcelRepository } from '../../shared/repositories/parcel.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([ParcelRepository]),
    CsvModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [ParcelController],
  providers: [ParcelService]
})
export class ParcelModule {}
