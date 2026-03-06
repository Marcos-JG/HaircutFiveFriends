'use strict';

import express from 'express';
import multer from 'multer';
import { 
    createReview, 
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getReviewsByBarbero,
    getReviewsByCliente,
    getReviewsByServicio,
    getAverageScoreByBarbero
} from './review.controller.js';
import { validateCreateReview, validateUpdateReview } from '../../middlewares/review-validator.js';

const router = express.Router();

// Configurar multer para procesar form-data sin archivos
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 0 }  // No permitir archivos
});

// Middleware para manejar errores de multer y pasar datos a req.body
const handleMulterAndBody = (req, res, next) => {
    upload.none()(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Error al procesar los datos: ' + err.message
            });
        }
        // Asegurar que req.body existe
        if (!req.body) {
            req.body = {};
        }
        next();
    });
};

// Rutas principales
router.post('/crear', handleMulterAndBody, validateCreateReview, createReview);         
router.get('/obtener', getAllReviews);                      
router.get('/obtener/:id', getReviewById);                  
router.put('/actualizar/:id', handleMulterAndBody, validateUpdateReview, updateReview);
router.delete('/eliminar/:id', deleteReview);               // DELETE - Eliminar reseña

// Rutas de filtrado
router.get('/barbero/:barberoId', getReviewsByBarbero);     // GET - Reseñas por barbero
router.get('/cliente/:clienteId', getReviewsByCliente);     // GET - Reseñas por cliente
router.get('/servicio/:servicioId', getReviewsByServicio);  // GET - Reseñas por servicio
router.get('/promedio/:barberoId', getAverageScoreByBarbero); // GET - Promedio de barbero

export default router;
