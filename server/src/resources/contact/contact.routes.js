import express from 'express';
import {getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact
} from './contact.controller.js'


const router = express.Router();

// - GET /api/contacts - Liste tous les contacts
router.get('/api/contact', getContacts)
// - GET /api/contacts/:id - Récupère un contact spécifique
router.get('/api/contact/:id', getContactById)
// - POST /api/contacts - Crée un nouveau contact AVEC UPLOAD DE FICHIER
router.post('/api/contact',createContact)
// - PUT /api/contacts/:id - Met à jour un contact AVEC UPLOAD DE FICHIER
router.put('/api/contact/:id',updateContact)
// - DELETE /api/contacts/:id - Supprime un contact
router.delete('/api/contact/:id', deleteContact)

export default router;
