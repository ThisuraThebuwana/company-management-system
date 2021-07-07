import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserModule } from './modules/user/user.module';
// import { CsvModule } from './modules/csv/csv.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    // CsvModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })
  ],
})
export class AppModule {}
