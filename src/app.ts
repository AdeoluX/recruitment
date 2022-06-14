import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import fileUpload from 'express-fileupload';
import httpStatus from 'http-status';
import ApiError from './utils/ApiError';
import cors from 'cors';
import { agenda } from './utils/schedules.job';

const mongoose = require('mongoose');

const app = express();

import { authRoutes, propertyRoutes, userRoutes } from './routes';
import { errorConverter, errorHandler } from './middleware/error';

import db from './db';

//mondodb connection
db.mongo;
// agenda queueing
agenda;

app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use('/api/v2/user', userRoute);
app.use('/api/v1/property', propertyRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

export default app;

// app.listen(3004, () => console.log(`Listening on: 3004`));

//module.exports.handler = serverless(app);

//"include": ["src/**/*"]
