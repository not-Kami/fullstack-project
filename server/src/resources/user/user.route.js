import express from 'express';
import { findAll, findOne, update, remove } from './user.controller.js';
import { authenticate, hasRole } from '../../api/auth/auth.middleware.js';
import { upload } from '../../config/multer.config.js';
import { validateUser } from './user.validation.js';

const userRouter = express.Router();

userRouter.route('/')
  .get(authenticate, hasRole(['admin']), findAll);

userRouter.route('/:id')
  .get(authenticate, findOne)
  .put(authenticate, upload.single('avatar'), validateUser, update)
  .delete(authenticate, remove);

userRouter.route('/:id/avatar')
  .post(authenticate, upload.single('avatar'), update);

export default userRouter; 