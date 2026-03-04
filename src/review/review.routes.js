'use strict';

import express from 'express';
import { uploadProfilePicture } from '../../middlewares/file-uploader.js';
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

const router = express.Router();

// Rutas principales
router.post('/crear', uploadProfilePicture.none(), createReview);         // POST - Crear reseña
router.get('/obtener', getAllReviews);                      // GET - Obtener todas
router.get('/obtener/:id', getReviewById);                  // GET - Obtener por ID
router.put('/actualizar/:id', uploadProfilePicture.none(), updateReview); // PUT - Actualizar reseña
router.delete('/eliminar/:id', deleteReview);               // DELETE - Eliminar reseña

// Rutas de filtrado
router.get('/barbero/:barberoId', getReviewsByBarbero);     // GET - Reseñas por barbero
router.get('/cliente/:clienteId', getReviewsByCliente);     // GET - Reseñas por cliente
router.get('/servicio/:servicioId', getReviewsByServicio);  // GET - Reseñas por servicio
router.get('/promedio/:barberoId', getAverageScoreByBarbero); // GET - Promedio de barbero

export default router;
