import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

// CUSTOM IMPORTS
import User from './Users';

// '@' indicate that this JS field it has relation with DB

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // By default an Colunm without params is a varchar
  @Column()
  provider_id: string;

  @Column('timestamp with time zone')
  date: Date;

  // Relation between tables
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
