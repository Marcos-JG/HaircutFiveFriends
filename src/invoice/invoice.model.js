import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    saleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sale',
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    subtotal: Number,
    tax: Number,
    total: Number,
    status: {
        type: String,
        enum: ['PAID', 'CANCELLED'],
        default: 'PAID'
    }
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice; // 👈 ESTO ES LO IMPORTANTE