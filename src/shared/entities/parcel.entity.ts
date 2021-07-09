import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('parcel')
export class Parcel {
  @PrimaryGeneratedColumn()
  index: number;

  @ManyToOne(() => User, user => user.parcel)
  @JoinColumn({ name: 'user' })
  user: string;

  @Column({ type: 'timestamp', name: 'datetime', default: null })
  datetime: Date;

  @Column({unique: true})
  tracking_no: string;

  @Column()
  order_no: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone_no: string;

  @Column()
  weight: number;

  @Column()
  rate: number;

  @Column({ default: null })
  status: string;

  @Column({ type: 'timestamp', name: 'status_date', default: null })
  status_date: Date;
}
