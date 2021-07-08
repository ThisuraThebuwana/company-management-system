import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parcel')
export class Parcel {
  @PrimaryGeneratedColumn()
  index: number;

  @Column()
  user: string;

  @Column({ type: 'timestamp', name: 'date', default: null })
  date: Date;

  @Column()
  time: string;

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
