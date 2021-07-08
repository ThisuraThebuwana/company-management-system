import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { BlogModule } from './modules/blog/blog.module';
import { ParcelModule } from './modules/parcel/parcel.module';
// import { CsvModule } from 'nest-csv-parser'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    // CsvModule,
    BlogModule,
    ParcelModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })
  ],
})
export class AppModule {}
