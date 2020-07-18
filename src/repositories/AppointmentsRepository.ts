import { isEqual } from 'date-fns';

// CUSTOM IMPORTS
import Appointment from '../models/Appointment';

// DTO Data Transfer Object
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

// An repository control all data manipulation between DB
class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  // Public function to find an appointment in a especific date an return it,
  // if do not find return null
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  // Public function that return an Appointment object type
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public all(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentsRepository;
