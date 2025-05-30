import { verifyToken } from '../../config/jwt.config.js';
import { User } from '../../resources/user/user.model.js';

export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token d\'authentification manquant' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const hasRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Non authentifié' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        next();
    };
};