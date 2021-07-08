import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blog')
export class Blog {
  @PrimaryGeneratedColumn()
  gen_id: number;

  @Column()
  id: number;

  @Column()
  name: string;

  @Column()
  length: number;
}

