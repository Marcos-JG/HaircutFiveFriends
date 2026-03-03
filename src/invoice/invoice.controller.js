import Invoice from './invoice.model.js';
import generateInvoicePDF from './invoice.pdf.js';

export const downloadInvoice = async (req, res) => {
    try {
        const { id } = req.params;

        // ⚠️ temporal mock si aún no tienes BD conectada
        const invoice = {
            invoiceNumber: 'INV-001',
            date: new Date(),
            clientName: 'Juan Pérez',
            subtotal: 100,
            tax: 12,
            total: 112,
            items: [
                { product: { name: 'Hair Gel' }, quantity: 1, price: 20 },
                { service: { name: 'Classic Haircut' }, quantity: 1, price: 80 }
            ]
        };

        const pdfBuffer = await generateInvoicePDF(invoice);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=invoice-${id}.pdf`,
        });

        res.send(pdfBuffer);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};