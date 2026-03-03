'user strict';

import mongoose from 'mongoose';

const reservationSchema = new mongoose  .Schema(
    {
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: [true, "Client is required"]
        },

        saleType: {
            type: String,
            enum: ["LOCAL", "DOMICILIO"],
            default: "LOCAL"
        },

        addressSale: {
            type: String
        },

        saleDate: {
            type: Date,
            required: [true, "Sale date is required"]
        },

        total: {
            type: Number,
            required: [true, "Total is required"]
        },

        paymentMethod: {
            type: String,
            required: [true, "Payment method is required"],
            enum: ["TARJETA_CREDITO/DEBITO", "EFECTIVO", "DEPOSITO_MOVIL"],
            default: "EFECTIVO"
        },

        status: {
            type: String,
            enum: ["COMPLETADO", "CANCELADO", "PENDIENTE"],
            default: "PENDIENTE"
        },
    },
    {
        timestamps: true,
        versionKey: false   
    }
)

// Export the model
const Sale = mongoose.model('Sale', reservationSchema);

export default Sale;
