import Joi from 'joi';
import { USER_ROLES } from './user.model.js';

export const userSchema = Joi.object({
    email: Joi.string()
        .required()
        .email()
        .messages({
            'string.empty': 'L\'email est requis',
            'string.email': 'L\'email doit être valide'
        }),
    
    password: Joi.string()
        .required()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .messages({
            'string.empty': 'Le mot de passe est requis',
            'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
            'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
        }),
    
    role: Joi.string()
        .valid(...USER_ROLES)
        .allow(null)
        .messages({
            'any.only': 'Le rôle doit être l\'un des suivants: ' + USER_ROLES.join(', ')
        }),
    
    avatar: Joi.string()
        .allow(null)
        .optional()
});

export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const errors = error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
        }));
        return res.status(400).json({ errors });
    }
    
    next();
}; 