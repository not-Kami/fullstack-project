import { Client } from "./client.model.js";

export async function createClient(req, res){
    try {
        const client = await client.create(req.body);
        res.status(201).json(client);
      } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création', erreur: err.message });
      }
    }