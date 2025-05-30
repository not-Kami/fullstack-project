import { Contact } from './contact.model.js';
import { User } from '../user/user.model.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction utilitaire pour supprimer un avatar
async function deleteAvatar(filename) {
    if (!filename) return;
    try {
        const avatarPath = path.join(__dirname, '../../../../uploads/avatars', filename);
        await fs.unlink(avatarPath);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'avatar:', error);
    }
}

export async function getContacts(req, res) {
    try {
        const contacts = await Contact.find({ user: req.user._id })
            .populate('user', 'email role avatar')
            .sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getContactById(req, res) {
    try {
        const { id } = req.params;
        const foundContact = await Contact.findOne({ _id: id, user: req.user._id })
            .populate('user', 'email role avatar');
            
        if (!foundContact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }
        res.json(foundContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createContact(req, res) {
    try {
        const { firstname, lastname, email } = req.body;
        const userId = req.user._id;

        // Vérifier si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const contact = new Contact({
            firstname,
            lastname,
            email,
            avatar: req.file?.filename || null,
            user: userId
        });

        await contact.save();
        
        // Populer les données utilisateur avant de renvoyer la réponse
        await contact.populate('user', 'email role avatar');
        res.status(201).json(contact);
    } catch (error) {
        // En cas d'erreur, supprimer l'avatar si présent
        if (req.file?.filename) {
            await deleteAvatar(req.file.filename);
        }
        res.status(400).json({ message: error.message });
    }
}

export async function updateContact(req, res) {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };
        
        // Récupérer le contact existant
        const existingContact = await Contact.findOne({ _id: id, user: req.user._id });
        if (!existingContact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }

        // Si un nouveau fichier est uploadé, supprimer l'ancien avatar
        if (req.file) {
            await deleteAvatar(existingContact.avatar);
            updateData.avatar = req.file.filename;
        }
        
        const updatedContact = await Contact.findOneAndUpdate(
            { _id: id, user: req.user._id },
            updateData,
            { new: true }
        ).populate('user', 'email role avatar');
        
        res.status(200).json(updatedContact);
    } catch (error) {
        // En cas d'erreur, supprimer le nouvel avatar si présent
        if (req.file?.filename) {
            await deleteAvatar(req.file.filename);
        }
        res.status(400).json({ message: error.message });
    }
}

export async function deleteContact(req, res) {
    try {
        const { id } = req.params;
        
        // Récupérer le contact avant de le supprimer
        const contact = await Contact.findOne({ _id: id, user: req.user._id });
        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }

        // Supprimer l'avatar si présent
        if (contact.avatar) {
            await deleteAvatar(contact.avatar);
        }

        await Contact.deleteOne({ _id: id, user: req.user._id });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}