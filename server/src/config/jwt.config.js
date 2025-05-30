import jwt from 'jsonwebtoken';
import { config } from './app.config.js';

export const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id,
            email: user.email,
            role: user.role 
        },
        config.jwtSecret,
        { expiresIn: '24h' }
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        throw new Error('Token invalide');
    }
}; 