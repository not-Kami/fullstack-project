import express from 'express';
import {createUser
} from './user.controller.js'


const router = express.Router();

router.post('/api/client',createClient);

// - GET /api/contacts/:id - Récupère un contact spécifique
router.get('/api/client/:id', getClientById)
// - POST /api/contacts - Crée un nouveau contact AVEC UPLOAD DE FICHIER
router.post('/api/client',createClientt)
// - PUT /api/contacts/:id - Met à jour un contact AVEC UPLOAD DE FICHIER
router.put('/api/client/:id',updateClient)
// - DELETE /api/contacts/:id - Supprime un contact
router.delete('/api/client/:id', deleteClient)

export default router