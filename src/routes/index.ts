import { Router, response } from 'express';
import appointmentRouter from './appointments.routes';

const routes = Router();

// Use appointmentsRouter to call all request with /appointments as
// default path
routes.use('/appointments', appointmentRouter);

export default routes;
