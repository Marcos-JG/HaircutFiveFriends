'use strict'

import Invoice from './invoice.model.js'
import generateInvoicePDF from './invoice.pdf.js'
import Sale from '../sale/sale.model.js'
import Detail from '../detailSale/detail.model.js'

export const downloadInvoice = async (req, res) => {
    try {

        const { saleId } = req.params

        // 1️⃣ Buscar venta con cliente
        const sale = await Sale.findById(saleId)
            .populate('clientId')

        if (!sale) {
            return res.status(404).json({
                success: false,
                message: 'Sale not found'
            })
        }

        // 2️⃣ Buscar detalles de la venta
        const details = await Detail.find({ saleId })
            .populate('productId')
            

        if (!details || details.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Sale details not found'
            })
        }

        // 3️⃣ Verificar si ya existe factura para esa venta
        let invoice = await Invoice.findOne({ saleId })

        if (!invoice) {

            // 🔹 Crear número único (puedes mejorarlo luego a incremental)
            const invoiceNumber = `INV-${Date.now()}`

            invoice = await Invoice.create({
                invoiceNumber,
                saleId: sale._id,
                subtotal: sale.total,
                tax: 0,
                total: sale.total,
                status: 'PAID'
            })
        }

        // 4️⃣ Generar PDF
        const pdfBuffer = await generateInvoicePDF({
            invoice,
            sale,
            details
        })

        // 5️⃣ Enviar PDF como descarga
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${invoice.invoiceNumber}.pdf`
        })

        return res.send(pdfBuffer)

    } catch (error) {
        console.error('Invoice error:', error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}