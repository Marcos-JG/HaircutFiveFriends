'user strict';

import mongoose from 'mongoose';
import validateDetail from '../../middlewares/validateDetail.js';

const detailSchema = new mongoose  .Schema(
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

detailSchema.pre('save', validateDetail)

detailSchema.index({ detailId: 1});
detailSchema.index({ saleId: 1});
detailSchema.index({ productId: 1});
detailSchema.index({ saleId: 1, productId: 1, detailId: 1});

const Detail = mongoose.model('Detail', detailSchema);

export default Detail;