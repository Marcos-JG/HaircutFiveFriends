'use strict';
import mongoose from 'mongoose';

const haircutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    imageRef: {
        type: String,
        default: null
    },
    faceTypeRecommended: {
        type: String,
        enum: ['OVALADO', 'CUADRADO', 'REDONDO', 'CORAZÓN', 'CUALQUIERA', 'TRIANGULAR'],
        required: true
    }
},
     {
        timestamps: true,
        versionKey: false
    }
)

haircutSchema.index({ name: 1 });
haircutSchema.index({ faceTypeRecommended: 1 });

const Haircut = mongoose.model('Haircut', haircutSchema);
export default Haircut;