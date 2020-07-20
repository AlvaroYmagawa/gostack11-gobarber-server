import { Router } from 'express';

// CUSTOM IMPORTS
import appointsmentRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router();

// Use appointmentsRouter to call all request with /appointments as
// default path
routes.use('/appointments', appointsmentRouter);
routes.use('/users', usersRouter);

export default routes;
