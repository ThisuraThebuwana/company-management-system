import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Parcel } from './parcel.entity';

@Entity('users')
export class User {
  @PrimaryColumn()
  user_id: string;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Parcel, parcel => parcel.user)
  parcel: Parcel[];
}
