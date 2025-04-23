
import express from 'express';
import {getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from './user.controller.js'


const router = express.Router();

// - GET /api/contacts - Liste tous les contacts
router.get('/api/user', getUsers)
// - GET /api/contacts/:id - Récupère un contact spécifique
router.get('/api/user/:id', getUserById)
// - POST /api/contacts - Crée un nouveau contact AVEC UPLOAD DE FICHIER
router.post('/api/user',createUser)
// - PUT /api/contacts/:id - Met à jour un contact AVEC UPLOAD DE FICHIER
router.put('/api/user/:id',updateUser)
// - DELETE /api/contacts/:id - Supprime un contact
router.delete('/api/user/:id', deleteUser)

export default router;