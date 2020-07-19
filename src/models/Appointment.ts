import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// '@' indicate that this JS field it has relation with DB

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // By default an Colunm without params is a varchar
  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
