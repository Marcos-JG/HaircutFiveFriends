'use strict';

import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        clienteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client',
            required: [true, 'El ID del cliente es obligatorio']
        },
        barberoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Barber',
            required: [true, 'El ID del barbero es obligatorio']
        },
        servicioId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: [true, 'El ID del servicio es obligatorio']
        },
        score:{
            type: Number,
            required: [true, 'La puntuación es obligatoria'],
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            trim: true,
            required: [true, 'El comentario es obligatorio']
        },


    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model('Review', reviewSchema)