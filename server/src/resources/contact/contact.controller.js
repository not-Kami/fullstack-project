export function getContacts (req, res){
    res.status(200);
    res.send(Contact.find())
}

export function getContactById(req, res){
    const { id } = req.params;
    const foundContact = Contact.findById(id);
    res.send(foundContact);
}

export function createContact(req, res){
    Contact.create(req.body);
    res.status(201).json(req.body);
}

export function updateContact(req, res){
    const { id } = req.params;
    const index = Contact.findIndex(c => c.id === Number(id));
    Contact[index] = { ...Contact[index], ...req.body };
    res.status(204)
    res.end();
    
}

export function deleteContact(req, res){
    const { id } = req.params;
    const index = Contact.findIndex(c => c.id === Number(id));
    if (index !== -1) {
        Contact.splice(index, 1);
    }
    res.status(204).end();
}