import { EntityRepository, Repository } from 'typeorm';

// CUSTOM IMPORTS
import Appointment from '../models/Appointment';

// An repository control all data manipulation between DB
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // In TS when a function is async it will always return an Promise
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
