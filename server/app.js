import {app, config} from './src/config/app.config.js';
import authRouter from './src/api/auth/auth.route.js';
import contactRouter from './src/resources/contact/contact.route.js';
import userRouter from './src/resources/user/user.route.js';
import {logger} from './src/api/logger.middleware.js';
import { dotenvConfig } from './src/config/env.config.js';
import mongoose from './src/config/database.config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the absolute path to the server directory
const serverDir = path.resolve(__dirname);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(serverDir, 'uploads')));

app.use('/', logger);
app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(config.port, () => {
  console.log('App is running on PORT : '+ config.port);
});

