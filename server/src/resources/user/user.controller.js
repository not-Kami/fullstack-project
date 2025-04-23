import {User} from './user.model.js'


export function getUsers (req, res){
    
}
export function getUserById(req, res){
    
}
export async function createUser(req, res){
    try {
        const User = await User.create(req.body);
        res.status(201).json(client);
      } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création', erreur: err.message });
      }
}

 export function updateUser(req, res){

 }

 export function deleteUser(req, res){

 }