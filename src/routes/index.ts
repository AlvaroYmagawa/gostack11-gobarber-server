import { Router } from 'express';

// CUSTOM IMPORTS
import appointsmentRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

// Use appointmentsRouter to call all request with /appointments as
// default path
routes.use('/appointments', appointsmentRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
