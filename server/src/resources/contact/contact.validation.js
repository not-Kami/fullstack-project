import Joi from 'joi';

export const contactSchema = Joi.object({
    firstname: Joi.string()
        .required()
        .min(2)
        .max(50)
        .messages({
            'string.empty': 'Le prénom est requis',
            'string.min': 'Le prénom doit contenir au moins 2 caractères',
            'string.max': 'Le prénom ne doit pas dépasser 50 caractères'
        }),
    
    lastname: Joi.string()
        .required()
        .min(2)
        .max(50)
        .messages({
            'string.empty': 'Le nom est requis',
            'string.min': 'Le nom doit contenir au moins 2 caractères',
            'string.max': 'Le nom ne doit pas dépasser 50 caractères'
        }),
    
    email: Joi.string()
        .required()
        .email()
        .messages({
            'string.empty': 'L\'email est requis',
            'string.email': 'L\'email doit être valide'
        }),
    
    avatar: Joi.string()
        .allow(null)
        .optional()
});

export const validateContact = (req, res, next) => {
    const { error } = contactSchema.validate(req.body, { abortEarly: false });
    
    if (error) {
        const errors = error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
        }));
        return res.status(400).json({ errors });
    }
    
    next();
}; 