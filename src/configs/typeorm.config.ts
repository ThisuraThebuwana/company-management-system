import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../shared/entities/user.entity';

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: process.env.MYSQL_HOST,
//   port: Number(process.env.MYSQL_PORT),
//   username: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true, // Set to false in production environment
//   insecureAuth: true,
//   // entityPrefix: "org_"
// };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'company_management_db',
  entities: [User],
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
