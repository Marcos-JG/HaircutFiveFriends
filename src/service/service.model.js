'use strict';

import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del servicio es obligatorio'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'La descripción del servicio es obligatoria'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'El precio del servicio es obligatorio'],
            min: 0
        },
        duration: {
            type: Number,
            required: [true, 'La duración del servicio es obligatoria'],
            min: 0
        },
        category: {
            type: String,
            required: [true, 'La categoría del servicio es obligatoria'],
            trim: true,
            enum: [
                'CORTE_DE_CABELLO',
                'AFEITADO',
                'RECORTES_DE_BARBA',
                'ARREGLO_DE_CABELLO',
                'TRATAMIENTOS_CAPILARES', 
                'TRATAMIENTOS_FACIALES',
            ]
        },
        status: {
            type: String,
            required: [true, 'El estado del servicio es obligatorio'],
            enum: ['activo', 'inactivo'],
            default: 'activo'
        },
        points: {
            type: Number,
            required: [true, 'Los puntos del servicio son obligatorios'],
            min: 0,
            default: 0
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Service', serviceSchema);