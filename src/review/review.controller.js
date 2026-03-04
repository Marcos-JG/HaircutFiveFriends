'use strict';

import mongoose from 'mongoose';
import Review from './review.model.js';

// Crear una nueva reseña
export const createReview = async (req, res)=>{
    try {
        const { clienteId, barberoId, servicioId, score, comment } = req.body;

        if (!clienteId || !barberoId || !servicioId || !score || !comment) {
            return res.status(400).json({
                success: false,
                message: 'Por favor complete todos los campos requeridos'
            });
        }

        const review = new Review(req.body);
        await review.save();
        
        res.status(201).json({
            success: true,
            message: 'Reseña creada exitosamente',
            data: review
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// obtener todas las reseñas
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('clienteId', 'name email')
            .populate('barberoId', 'name')
            .populate('servicioId', 'name category price');
        
        res.status(200).json({
            success: true,
            message: 'Reseñas obtenidas exitosamente',
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener una reseña por ID
export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id)
            .populate('clienteId', 'name email')
            .populate('barberoId', 'name')
            .populate('servicioId', 'name category price');

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Reseña obtenida exitosamente',
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Actualizar una reseña
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { score, comment } = req.body;

        let review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        if (score !== undefined) review.score = score;
        if (comment) review.comment = comment;

        await review.save();

        res.status(200).json({
            success: true,
            message: 'Reseña actualizada exitosamente',
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar una reseña
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Reseña no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Reseña eliminada exitosamente',
            data: review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener reseñas por barbero
export const getReviewsByBarbero = async (req, res) => {
    try {
        const { barberoId } = req.params;
        const reviews = await Review.find({ barberoId })
            .populate('clienteId', 'name email')
            .populate('servicioId', 'name price');

        res.status(200).json({
            success: true,
            message: `Reseñas del barbero obtenidas exitosamente`,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener reseñas por cliente
export const getReviewsByCliente = async (req, res) => {
    try {
        const { clienteId } = req.params;
        const reviews = await Review.find({ clienteId })
            .populate('barberoId', 'name')
            .populate('servicioId', 'name price');

        res.status(200).json({
            success: true,
            message: `Reseñas del cliente obtenidas exitosamente`,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener reseñas por servicio
export const getReviewsByServicio = async (req, res) => {
    try {
        const { servicioId } = req.params;
        const reviews = await Review.find({ servicioId })
            .populate('clienteId', 'name email')
            .populate('barberoId', 'name');

        res.status(200).json({
            success: true,
            message: `Reseñas del servicio obtenidas exitosamente`,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener promedio de calificaciones por barbero
export const getAverageScoreByBarbero = async (req, res) => {
    try {
        const { barberoId } = req.params;
        const result = await Review.aggregate([
            { $match: { barberoId: mongoose.Types.ObjectId(barberoId) } },
            {
                $group: {
                    _id: '$barberoId',
                    averageScore: { $avg: '$score' },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron reseñas para este barbero'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Promedio calculado exitosamente',
            data: {
                barberoId: result[0]._id,
                averageScore: result[0].averageScore.toFixed(2),
                totalReviews: result[0].totalReviews
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};