import express from 'express';
import {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} from './contact.controller.js';
import { upload } from '../../config/multer.config.js';
import { validateContact } from './contact.validation.js';
import { authenticate } from '../../api/auth/auth.middleware.js';

const contactRouter = express.Router();

// Base routes
contactRouter.get('/', authenticate, getContacts);
contactRouter.get('/:id', getContactById);
contactRouter.post('/', authenticate, upload.single('avatar'), validateContact, createContact);
contactRouter.put('/:id', authenticate, upload.single('avatar'), validateContact, updateContact);
contactRouter.delete('/:id', authenticate, deleteContact);

// Avatar upload route
contactRouter.post('/:id/avatar', authenticate, upload.single('avatar'), updateContact);

export default contactRouter;
