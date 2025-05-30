import { USER_ROLES } from "../../resources/user/user.model.js"
import { User } from "../../resources/user/user.model.js"
import bcrypt from 'bcrypt'
import { generateToken } from '../../config/jwt.config.js'

export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer le nouvel utilisateur
        const user = await User.create({
            email,
            password: hashedPassword,
            role
        });

        // Générer le token
        const token = generateToken(user);

        // Retourner les informations de l'utilisateur et le token
        res.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Générer le token
        const token = generateToken(user);

        // Retourner les informations de l'utilisateur et le token
        res.json({
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}