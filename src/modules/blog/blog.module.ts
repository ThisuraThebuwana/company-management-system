import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from '../../shared/repositories/blog.repository';
import { CsvModule } from 'nest-csv-parser'


@Module({
  imports: [
    TypeOrmModule.forFeature([BlogRepository]),
    CsvModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule {}
