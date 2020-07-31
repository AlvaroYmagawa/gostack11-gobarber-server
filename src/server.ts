import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
// This makes express handle with async routes error, need to be imported after
// express
import 'express-async-errors';

// CUSTOM IMPORTS
import AppError from './errors/AppError';
import routes from './routes';
import './database';
import uploadConfig from './config/upload';

const app = express();

app.use(express.json());
// This will serve a path for our tmp folder and then show the requested file
// in every files route
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Middleware to deal with errors, has to be after routes because is in routes that
// occur errors
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Case the error is an custom error that we create return AppError
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  // If is not an AppError we just send a generic response error
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
