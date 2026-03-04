'user strict';

import mongoose from 'mongoose';
import validateDetail from '../../middlewares/validateDetail.js';

const reservationSchema = new mongoose  .Schema(
    {
        saleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sale",
            required: [true, "Sale is required"]
        },

        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product is required"]
        },

        quantity: {
            type: Number,
            required: [true, "Quantity is required"]
        },

        total: {
            type: Number,
            required: [true, "Total is required"]
        }
    },
    {
        timestamps: true,
        versionKey: false   
    }
)

reservationSchema.pre('save', validateDetail)

reservationSchema.index({ detailId: 1});
reservationSchema.index({ saleId: 1});
reservationSchema.index({ productId: 1});
reservationSchema.index({ saleId: 1, productId: 1, detailId: 1});

const Detail = mongoose.model('Detail', reservationSchema);

export default Detail;