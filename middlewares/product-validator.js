'use strict';

import { body, param, validationResult } from 'express-validator';

const validCategories = [
    'SHAMPOO',
    'WAX',
    'GEL',
    'BEARD_OIL',
    'MACHINES',
    'ACCESSORIES'
];

const validStatus = ['active', 'inactive'];

const handleValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validacion',
            errors: errors.array()
        });
    }
    next();
};

export const validateProductId = [
    param('id')
        .trim()
        .notEmpty().withMessage('El id del producto es requerido')
        .isMongoId().withMessage('El id del producto no es valido'),
    handleValidationResult
];

export const validateCreateProduct = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre del producto es requerido')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('description')
        .trim()
        .notEmpty().withMessage('La descripcion del producto es requerida')
        .isLength({ min: 5 }).withMessage('La descripcion debe tener al menos 5 caracteres'),

    body('price')
        .notEmpty().withMessage('El precio es requerido')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un numero mayor o igual a 0'),

    body('pointsPrice')
        .optional({ values: 'falsy' })
        .isFloat({ min: 0 }).withMessage('El precio en puntos debe ser un numero mayor o igual a 0'),

    body('stock')
        .notEmpty().withMessage('El stock es requerido')
        .isInt({ min: 0 }).withMessage('El stock debe ser un numero entero mayor o igual a 0'),

    body('category')
        .trim()
        .notEmpty().withMessage('La categoria es requerida')
        .isIn(validCategories).withMessage(`La categoria debe ser una de: ${validCategories.join(', ')}`),

    body('status')
        .optional()
        .trim()
        .isIn(validStatus).withMessage('El estado debe ser active o inactive'),

    handleValidationResult
];

export const validateUpdateProduct = [
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('El nombre no puede estar vacio')
        .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('description')
        .optional()
        .trim()
        .notEmpty().withMessage('La descripcion no puede estar vacia')
        .isLength({ min: 5 }).withMessage('La descripcion debe tener al menos 5 caracteres'),

    body('price')
        .optional()
        .isFloat({ min: 0 }).withMessage('El precio debe ser un numero mayor o igual a 0'),

    body('pointsPrice')
        .optional({ values: 'falsy' })
        .isFloat({ min: 0 }).withMessage('El precio en puntos debe ser un numero mayor o igual a 0'),

    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('El stock debe ser un numero entero mayor o igual a 0'),

    body('category')
        .optional()
        .trim()
        .isIn(validCategories).withMessage(`La categoria debe ser una de: ${validCategories.join(', ')}`),

    body('status')
        .optional()
        .trim()
        .isIn(validStatus).withMessage('El estado debe ser active o inactive'),

    handleValidationResult
];
