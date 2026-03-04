'use strict';

import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Validaciones para crear reseña
export const validateCreateReview = [
    body('clienteId')
        .trim()
        .notEmpty().withMessage('El ID del cliente es requerido')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('El ID del cliente no es válido');
            }
            return true;
        }),

    body('barberoId')
        .trim()
        .notEmpty().withMessage('El ID del barbero es requerido')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('El ID del barbero no es válido');
            }
            return true;
        }),

    body('servicioId')
        .trim()
        .notEmpty().withMessage('El ID del servicio es requerido')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('El ID del servicio no es válido');
            }
            return true;
        }),

    body('score')
        .notEmpty().withMessage('La puntuación es requerida')
        .isInt({ min: 1, max: 5 }).withMessage('La puntuación debe ser un número entero entre 1 y 5'),

    body('comment')
        .trim()
        .notEmpty().withMessage('El comentario es requerido')
        .isLength({ min: 10 }).withMessage('El comentario debe tener al menos 10 caracteres')
        .isLength({ max: 500 }).withMessage('El comentario no puede exceder los 500 caracteres'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errores de validación',
                errors: errors.array()
            });
        }
        next();
    }
];

// Validaciones para actualizar reseña
export const validateUpdateReview = [
    body('score')
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage('La puntuación debe ser un número entero entre 1 y 5'),

    body('comment')
        .optional()
        .trim()
        .notEmpty().withMessage('El comentario no puede estar vacío')
        .isLength({ min: 10 }).withMessage('El comentario debe tener al menos 10 caracteres')
        .isLength({ max: 500 }).withMessage('El comentario no puede exceder los 500 caracteres'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errores de validación',
                errors: errors.array()
            });
        }
        next();
    }
];
