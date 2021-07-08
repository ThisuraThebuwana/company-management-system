import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../shared/entities/user.entity';
import { Blog } from '../shared/entities/blog.entity';
import { Parcel } from '../shared/entities/parcel.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'company_management_db',
  entities: [User, Blog, Parcel],
  synchronize: true,
};
