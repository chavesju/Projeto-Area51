import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm';

@Entity('persons')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type_person: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Timestamp;

  @UpdateDateColumn()
  updated_at: Timestamp;
}
