import {contact} from './contact.database.js'


export function getContacts (req, res){
    res.send(contact)
}

export function getContactById(req, res){
    const { id } = req.params;
    const foundContact = contact.find(c => c.id === Number(id));
    res.send(foundContact);
}

export function createContact(req, res){
    contact.push(req.body);
    res.status(201).json(req.body);
}

export function updateContact(req, res){
    const { id } = req.params;
    const index = contact.findIndex(c => c.id === Number(id));
    contact[index] = { ...contact[index], ...req.body };
    res.end();
}

export function deleteContact(req, res){
    const { id } = req.params;
    const index = contact.findIndex(c => c.id === Number(id));
    if (index !== -1) {
        contact.splice(index, 1);
    }
    res.status(204).end();
}